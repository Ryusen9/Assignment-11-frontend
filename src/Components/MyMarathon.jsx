import React, { useContext, useEffect, useState } from "react";
import Context from "./Context/Context";
import axios from "axios";
import Loader from "./Loader";
import Swal from "sweetalert2";

const MyMarathon = () => {
  const { user } = useContext(Context);
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/myMarathon?userEmail=${user.email}`)
        .then((res) => {
          setUserInfo(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user?.email]);
  const handleDelete = (id) => {
    axios
      .delete(
        `http://localhost:5000/myMarathon?userEmail=${user.email}&id=${id}`
      )
      .then(() => {
        Swal.fire(
          "Marathon deleted",
          "Your marathon has been deleted successfully!",
          "success"
        );
      });
  };

  return (
    <div className="min-h-screen w-full mt-24">
      <div className="max-w-7xl h-full mx-auto px-4">
        <div className="text-center mb-8">
          <p className="font-Heebo uppercase text-2xl font-semibold">
            My Marathons
          </p>
          <p className="text-sm font-medium font-Heebo uppercase">
            Marathons event that I've created
          </p>
        </div>

        {loading ? (
          <div className="text-center">
            <Loader />
          </div>
        ) : userInfo.length === 0 ? (
          <div className="text-center text-gray-500">No marathon found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-xs">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Marathon Start Date</th>
                  <th>Created At</th>
                  <th>Location</th>
                  <th>Total Registration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userInfo.map((info, index) => (
                  <tr key={info._id}>
                    <th>{index + 1}</th>
                    <td>{info.marathonTitle}</td>
                    <td>{info.marathonStartDate}</td>
                    <td>{info.createdAt}</td>
                    <td>{info.location}</td>
                    <td>{info.totalRegistrationCount}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button className="btn btn-sm btn-primary btn-outline">
                          Update
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(info._id)}
                          className="btn btn-sm btn-error btn-outline"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyMarathon;
