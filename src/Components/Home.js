import React, { useContext, useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { newContext } from "../App";
import Candidate from "./Candidate";
import { useNavigate } from "react-router-dom";
function Home() {
  let context = useContext(newContext);

  let navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  });

  let checkAuth = async () => {
    let token = sessionStorage.getItem("token");
    if (token) {
      window.history.forward();
      let config = {
        headers: {
          token: token,
        },
      };
      let res = await axios.post(
        "https://des-ass.herokuapp.com/users/auth",
        {
          Purpose: "Approve",
        },
        config
      );
      if (res.data.statusCode !== 200) {
        alert("Session Ended");
        sessionStorage.clear();
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };

  let [data, setData] = useState([]);

  let getData = async () => {
    let res = await axios.get("https://des-ass.herokuapp.com/users/candidate");
    setData(res.data.user);
  };

  useEffect(() => {
    getData();
  }, []);

  let handleRemove = async (e) => {
    let res = await axios.delete(
      "https://des-ass.herokuapp.com/users/removecandidate/" + e._id
    );
    console.log(res);
    getData();
  };

  let logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="container">
      <button
        className="btn btn-secondary mt-2 float-right"
        onClick={() => logout()}
      >
        Logout
      </button>
      <div className="mt-5">
        <h5>Candidates List : {data.length}</h5>
        <Table className="mt-5 text-center" striped hover>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Email</th>
              <th>Result</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((e, i) => {
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>{e.name}</td>
                  <td>{e.dateofbirth}</td>
                  <td>{e.email}</td>
                  <td>
                    <Form.Select aria-label="Default select example">
                      <option value="1">Shortlisted</option>
                      <option value="1">Rejected</option>
                    </Form.Select>
                  </td>
                  <td>
                    <ModeEditOutlineIcon
                      onClick={() => {
                        context?.setOtherData(e);
                        context?.setBoolTrue(false)
                        context?.setOtherModalShow(true);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                    &nbsp;&nbsp;
                    <DeleteOutlineIcon
                      onClick={() => {
                        handleRemove(e);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div>
          <button
            className="btn text-primary shadow-none"
            onClick={() => {
              context?.setOtherData();
              context?.setOtherModalShow(true);
              context?.setBoolTrue(true);
            }}
          >
            <AddIcon />
            Add new candidate
          </button>

          <Candidate
            show={context?.otherModalShow}
            onHide={() => {
              context?.setOtherModalShow(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
