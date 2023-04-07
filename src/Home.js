import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import "./App.css";

const Home = () => {
  const socket = io("http://localhost:5000");

  const [code, setCode] = useState();
  const [copys, setCopys] = useState(false);
  const [val, setVal] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  // create meeting code
  const call = () => {
    setCopys(false);
    socket.emit("me", socket.id);
    socket.on("getid", (arg) => {
      setCode(arg);
    });
  };

  // onclick copy the meeting code
  const copy = (e) => {
    navigator.clipboard.writeText(code);
    setCopys(!copys);
  };

  const change = (e) => {
    setVal(e.target.value);
  };

  // onclick navigate to the meeeting page
  const join = () => {
    navigate(`/${name}/${val}`);
  };

  // handle the onchange event
  const namehandle = (e) => {
    setName(e.target.value);
  };

  return (
    <div>
      <img
        className="zoom-image"
        src="https://1000logos.net/wp-content/uploads/2021/06/Zoom-Logo-2014.png"
      />
      <h1 className="hero text-center my-8 text-3xl">Video chat App</h1>
      {/* host meeting */}
      <div className="flex flex-col container mx-auto  md:flex-row">
        <div className="mx-auto p-4 w-full  md:w-1/3">
          <h2 className=" text-2xl text-center my-6 text-green-600 ">
            Create The Meeting
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className=" flex flex-col mx-auto space-y-6 "
          >
            {code && (
              <div
                type="text"
                className="border p-2 flex flex-row justify-between"
              >
                <p className=" w-11/12 overflow-hidden">{code}</p>
                {!copys ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={copy}
                    className="h-6 w-6 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-500 bg-slate-100 rounded-xl"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            )}
            <button
              className=" bg-blue-500 text-white py-2 rounded-lg "
              onClick={call}
            >
              Create Code
            </button>
          </form>
          <img
            className="hero__image"
            src="https://global-uploads.webflow.com/5f8b3f92189560cd389cf2b3/6050eb64c6cade12359cab66_featured-look-good-zoom.png"
          />
        </div>
        {/* join meeting */}
        <div className="mx-auto p-4 w-full  md:w-1/3">
          <h2 className="text-2xl text-center my-6 text-green-600 ">
            Join Meeting
          </h2>
          <form onSubmit={join} className="flex flex-col mx-auto space-y-6 ">
            <input
              required={true}
              type="text"
              value={name}
              onChange={namehandle}
              className="border p-2"
              placeholder="Enter your Name"
            />
            <input
              required
              value={val}
              onChange={change}
              type="text"
              className="border p-2"
              placeholder="Enter your code"
            />
            <button
              type="submit"
              className=" join-btn bg-blue-500 text-white py-2 rounded-lg"
            >
              Join
            </button>
          </form>
          <img
            className="image-title"
            src="https://assets.website-files.com/634681057b887c6f4830fae2/6367ddbb892c1121704116e2_6259f9083b0e477629ac4f4b_zoom_integration.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
