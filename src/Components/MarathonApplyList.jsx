import React, { useContext, useEffect, useState } from "react";
import Context from "./Context/Context";
import axios from "axios";
import Swal from "sweetalert2";

const MarathonApplyList = () => {
  const { user } = useContext(Context);
  const [usersInfo, setUsersInfo] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/userApplications?userEmail=${user.email}`)
        .then((res) => setUsersInfo(res.data))
        .catch((err) => console.error(err));
    }
  }, [user?.email]);

  const handleDelete = (marathonId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `http://localhost:5000/userApplications?userEmail=${user.email}&marathonId=${marathonId}`
          )
          .then(() => {
            Swal.fire(
              "Deleted!",
              "Your application has been deleted.",
              "success"
            );
            setUsersInfo((prev) =>
              prev.filter(
                (application) => application.marathonId !== marathonId
              )
            );
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  const openUpdateModal = (user) => {
    setSelectedUser(user);
    document.getElementById("update_modal").showModal();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedAge = form.age.value;
    const updatedContact = form.emergencyContact.value;
    const updatedName = form.name.value;

    axios
      .patch(
        `http://localhost:5000/userApplications?userEmail=${user.email}&marathonId=${selectedUser.marathonId}`,
        {
          age: updatedAge,
          emergencyContact: updatedContact,
          applicantName: updatedName,
        }
      )
      .then(() => {
        Swal.fire("Updated!", "Your application has been updated.", "success");
        setUsersInfo((prev) =>
          prev.map((application) =>
            application.marathonId === selectedUser.marathonId
              ? {
                  ...application,
                  age: updatedAge,
                  emergencyContact: updatedContact,
                  applicantName: updatedName,
                }
              : application
          )
        );
        document.getElementById("update_modal").close();
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error!", "Failed to update.", "error");
      });
  };

  return (
    <div className="min-h-screen w-full mt-24">
      <div className="h-full max-w-7xl mx-auto">
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th></th>
                <th>{`Name (age)`}</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Event Name</th>
                <th>Application Time</th>
                <th>Marathon Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {usersInfo.map((user, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{`${user.applicantName} (${user.age})`}</td>
                  <td>{user.applicantEmail}</td>
                  <td>{user.emergencyContact}</td>
                  <td>{user.marathonTitle}</td>
                  <td>{new Date(user.appliedAt).toLocaleString()}</td>
                  <td>{user.marathonStartDate}</td>
                  <td className="flex gap-1.5">
                    <button
                      className="btn btn-sm"
                      onClick={() => openUpdateModal(user)}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(user.marathonId)}
                      className="btn btn-error btn-sm btn-outline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {usersInfo.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Modal */}
      <dialog id="update_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Update Application</h3>
          {selectedUser && (
            <form onSubmit={handleUpdate} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                defaultValue={selectedUser.applicantName}
                placeholder="Your Name"
                required
                className="input input-bordered w-full"
              />
              <input
                type="email"
                value={selectedUser.applicantEmail}
                readOnly
                className="input input-bordered w-full"
              />
              <input
                type="text"
                value={selectedUser.marathonTitle}
                readOnly
                className="input input-bordered w-full"
              />
              <input
                type="number"
                name="age"
                defaultValue={selectedUser.age}
                placeholder="Your Age"
                required
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="emergencyContact"
                defaultValue={selectedUser.emergencyContact}
                placeholder="Emergency Contact"
                required
                className="input input-bordered w-full"
              />
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-semibold tracking-wide transition-all"
              >
                Update Application
              </button>
            </form>
          )}
          <form method="dialog" className="modal-backdrop">
            <button>Close</button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MarathonApplyList;
