import React, { useState } from "react";
import "../Styles/ApplyStyles.css";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";

const ApplyLeave = () => {
  const [formData, setFormData] = useState({
    leaveType: "",
    leaveDays: "ONE_DAY",
    fromDate: "",
    fromSession: "FULL_DAY",
    toDate: "",
    toSession: "FULL_DAY",
    purpose: "",
    purposeOfLeave: "",
    contactAddress: "",
    contactNo: "98753216547",
    leavingHeadquaters: "",
    visitingPlace: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "leavingHeadquaters" && value === "NO") {
      setFormData((prev) => ({
        ...prev,
        leavingHeadquaters: value,
        visitingPlace: "",
      }));
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/api/leaves/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Saved:", data);
      toast.success("Leave Applied Successfully!");
    } catch (error) {
      toast.error("Failed to apply leave.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container-xxl mt-4 px-4">
      <div className="card w-75">
        <div className="card-body">
          <h5 className="card-title mb-3">Apply Leave</h5>

          <div className="border-top border-3 border-success pt-2 mb-4 fw-bold">
            Leaves Availed CL : <span className="text-danger">( 0 / 15 )</span>
            &nbsp;&nbsp;OH : <span className="text-danger">( 0 / 5 )</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label black">
                  Leave Type <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="leaveType"
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>--Select--</option>
                  <option value="CL">Casual Leave</option>
                  <option value="OH">Optional Holiday</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label black">
                  Leave Days <span className="text-danger">*</span>
                </label>
                <div className="d-flex gap-4 mt-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="leaveDays"
                      value="ONE_DAY"
                      checked={formData.leaveDays === "ONE_DAY"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">
                      Half Day / One Day
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="leaveDays"
                      value="MULTI_DAY"
                      checked={formData.leaveDays === "MULTI_DAY"}
                      onChange={handleChange}
                    />
                    <label className="form-check-label">
                      More than One Day
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label black">
                  From Date <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <input
                    type="date"
                    className="form-control"
                    name="fromDate"
                    onChange={handleChange}
                    required
                  />
                  
                  <select
                    className="form-select"
                    name="fromSession"
                    onChange={handleChange}
                  >
                    <option value="FULL_DAY">Full Day</option>
                    <option value="FIRST_HALF">Forenoon</option>
                    <option value="SECOND_HALF">Afternoon</option>
                  </select>
                </div>
              </div>

              {formData.leaveDays === "MULTI_DAY" && (
                <div className="col-md-6">
                  <label className="form-label black">
                    To Date <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type="date"
                      className="form-control"
                      name="toDate"
                      onChange={handleChange}
                      required
                    />
                    
                    <select
                      className="form-select"
                      name="toSession"
                      onChange={handleChange}
                    >
                      <option value="FULL_DAY">Full Day</option>
                      <option value="FIRST_HALF">Forenoon</option>
                      <option value="SECOND_HALF">Afternoon</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            <div className="row mb-3 align-items-center">
              <div className="col-md-6">
                <label className="form-label black d-block">
                  Leaving Headquarters <span className="text-danger">*</span>
                </label>

                <div className="d-flex gap-4 mt-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="leavingHeadquaters"
                      id="leavingYes"
                      value="YES"
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="leavingYes">
                      Yes
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="leavingHeadquaters"
                      id="leavingNo"
                      value="NO"
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="leavingNo">
                      No
                    </label>
                  </div>
                </div>
              </div>

              {formData.leavingHeadquaters === "YES" && (
                <div className="col-md-6">
                  <label className="form-label black">Visiting Place</label>
                  <input
                    type="text"
                    className="form-control"
                    name="visitingPlace"
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label black">
                  Purpose <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  name="purpose"
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>--Select--</option>
                  <option value="PERSONAL">Personal Grounds</option>
                  <option value="MEDICAL">Medical Grounds</option>
                  <option value="HOME">Visit Home Town</option>
                  <option value="FESTIVAL">Festival</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label black">
                  Purpose of Leave <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  name="purposeOfLeave"
                  rows="3"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label black">
                Leave Period Contact Address{" "}
                <span className="text-danger">*</span>
              </label>
              <textarea
                className="form-control"
                name="contactAddress"
                rows="3"
                maxLength="250"
                onChange={handleChange}
                required
              />
              <small className="text-danger">(Max: 250 characters)</small>
            </div>

            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label black">
                  Contact No. <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text">91</span>
                  <input
                    type="text"
                    className="form-control"
                    maxLength="10"
                    name="contactNo"
                    placeholder="9783935309"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="container mt-3">
              <div className="row mb-2">
                <div className="col-md-4 fw-bold text-end">
                  Approver Details <span className="text-danger">*</span>
                </div>
                <div className="col-md-8">
                  M. Raghunandan Rao, Commissioner (CT), Commissioner of
                  Commercial Taxes
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-md-4 fw-bold text-end">
                  Leave Intimation Officer - I{" "}
                  <span className="text-danger">*</span>
                </div>
                <div className="col-md-8">
                  Korremula Geeta, Addl.CST.(Estt.Serv), Commissioner of
                  Commercial Taxes
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-md-4 fw-bold text-end">
                  Leave Intimation Officer - II{" "}
                  <span className="text-danger">*</span>
                </div>
                <div className="col-md-8">
                  Test Krishna, Addl.CST.(Estt.Serv), Commissioner Of Commercial
                  Taxes Department, Commissioner of Commercial Taxes
                </div>
              </div>
            </div>

            <div className="container mt-4">
              <div className="card">
                <div className="card-header fw-bold">
                  Leave / Official Permission Description
                </div>
                <div className="card-body">
                  <p className="mb-0">This is Test description</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-4">
              <button className="btn btn-primary">Apply Leave</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyLeave;
