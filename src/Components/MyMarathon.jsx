import React, { useContext, useEffect, useState } from "react";
import Context from "./Context/Context";
import axios from "axios";
import Swal from "sweetalert2";
import { BiLocationPlus } from "react-icons/bi";
import Lottie from "lottie-react";
import loadingAnimation from "../../public/Lottie/Loading animation.json";
import { Link } from "react-router-dom";

const MyMarathon = () => {
  const { user } = useContext(Context);
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRunningDistance, setTotalRunningDistance] = useState("25k");
  const handleRunningDistance = (e) => {
    setTotalRunningDistance(e.target.value);
  };

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
  const handleUpdate = (e, id) => {
    e.preventDefault();
    const form = e.target;
    const updatedEvent = {
      marathonTitle: form.title.value,
      marathonStartDate: form.eventStartDate.value,
      startRegistrationDate: form.regStartDate.value,
      endRegistrationDate: form.regEndDate.value,
      location: form.location.value,
      runningDistance: totalRunningDistance,
      marathonImage: form.marathonImage.value,
      description: form.description.value,
    };
    axios
      .patch(
        `http://localhost:5000/myMarathon?userEmail=${user.email}&id=${id}`,
        updatedEvent
      )
      .then(() => window.location.reload());
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
          <div className="mt-4 bg-emerald-200/60 p-4 rounded-2xl flex items-center justify-between">
            <p>Applied for marathon? go check it out!</p>
            <Link to={"/myApplyList"}>
              <button className="btn btn-md btn-primary">
                My Marathon Application
              </button>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center">
            <Lottie animationData={loadingAnimation} />
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
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button
                          className="btn btn-sm btn-primary btn-outline"
                          onClick={() =>
                            document.getElementById("my_modal_2").showModal()
                          }
                        >
                          Update
                        </button>
                        <dialog id="my_modal_2" className="modal">
                          <div className="modal-box">
                            <form
                              onSubmit={(e) => handleUpdate(e, info._id)}
                              action="marathon-update"
                              className={`p-4 my-4 flex items-center justify-center flex-col rounded-2xl`}
                            >
                              <div>
                                <p className="text-center text-wrap font-Heebo font-semibold text-lg mb-8">
                                  Update your event!
                                </p>
                              </div>
                              <div className="grid grid-cols-3 gap-4">
                                <div className="flex flex-col justify-center w-full col-span-3 md:col-span-2">
                                  <label htmlFor="title">Title</label>
                                  <input
                                    type="text"
                                    defaultValue={info.marathonTitle}
                                    id="title"
                                    name="title"
                                    className="input w-full"
                                    required
                                  />
                                </div>
                                <div className="md:col-start-3 text-xs md:text-base flex flex-col justify-center w-full">
                                  <label htmlFor="eventStart">
                                    Event Start Date
                                  </label>
                                  <input
                                    type="date"
                                    defaultValue={info.marathonStartDate}
                                    name="eventStartDate"
                                    className="input"
                                  />
                                </div>
                                <div className="flex flex-col text-xs md:text-base justify-center w-full">
                                  <label htmlFor="registration-start">
                                    Registration Start Date
                                  </label>
                                  <input
                                    type="date"
                                    defaultValue={info.startRegistrationDate}
                                    name="regStartDate"
                                    className="input"
                                  />
                                </div>
                                <div className="flex md:col-start-3 text-xs md:text-base flex-col justify-center w-full">
                                  <label htmlFor="registration-start">
                                    Registration End Date
                                  </label>
                                  <input
                                    defaultValue={info.endRegistrationDate}
                                    type="date"
                                    name="regEndDate"
                                    className="input"
                                  />
                                </div>
                                <div className="flex col-span-3 md:col-span-2 flex-col justify-center w-full">
                                  <label
                                    htmlFor="location"
                                    className="flex gap-1 items-center"
                                  >
                                    <BiLocationPlus /> Location:
                                  </label>
                                  <input
                                    type="text"
                                    defaultValue={info.location}
                                    id="location"
                                    name="location"
                                    className="input w-full"
                                  />
                                </div>
                                <div className="flex flex-col justify-center w-full">
                                  <fieldset className="fieldset">
                                    <legend className="fieldset-legend">
                                      Running Distance
                                    </legend>
                                    <select
                                      onChange={handleRunningDistance}
                                      defaultValue={info.runningDistance}
                                      className="select"
                                    >
                                      <option value={"25k"}>25k</option>
                                      <option value={"10k"}>10k</option>
                                      <option value={"3k"}>3k</option>
                                    </select>
                                  </fieldset>
                                </div>
                                <div className="flex flex-col md:col-span-3 col-span-2 justify-center w-full">
                                  <label htmlFor="marathon-image">
                                    Marathon Image:
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Enter URL"
                                    defaultValue={info.marathonImage}
                                    id="marathon-image"
                                    name="marathonImage"
                                    className="input w-full"
                                  />
                                </div>
                                <div className="flex col-span-3 flex-col justify-center w-full">
                                  <fieldset className="fieldset">
                                    <legend className="fieldset-legend">
                                      Description
                                    </legend>
                                    <textarea
                                      id="description"
                                      name="description"
                                      defaultValue={info.description}
                                      className="textarea h-24 w-full"
                                      placeholder="Event information"
                                    ></textarea>
                                    <div className="fieldset-label">
                                      Enter necessary details regarding the
                                      event
                                    </div>
                                  </fieldset>
                                </div>
                              </div>
                              <div className="flex justify-center mt-4">
                                <button type="submit" className="btn">
                                  Update Event
                                </button>
                              </div>
                            </form>
                          </div>
                          <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                          </form>
                        </dialog>
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
