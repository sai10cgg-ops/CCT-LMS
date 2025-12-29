/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import "../Styles/NewOfficerRegistrationForm.css";
import { toast } from "react-toastify";

const initialState = {
  officerType: "",
  officerId: "",
  aadhaar: "",
  title: "",
  name: "",
  fatherSpouse: "",
  dob: "",
  gender: "",
  phone: "",
  email: "",
  permanentAddress: "",
  presentAddress: "",
  joiningDate: "",
  department: "",
  subDepartment: "",
  section: "",
  rank: "",
  deputation: "",
  role: "",
  postingDetails: "",
  photo: null,
  photoPreview: null,
};

const NewOfficerRegistrationForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [sameAddress, setSameAddress] = useState(false);
  const [minJoiningDate, setMinJoiningDate] = useState("");
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (formData.dob) {
      const dob = new Date(formData.dob);
      const minDate = new Date(
        dob.getFullYear() + 18,
        dob.getMonth(),
        dob.getDate()
      );
      setMinJoiningDate(minDate.toISOString().split("T")[0]);
    }
  }, [formData.dob]);

  useEffect(() => {
    if (formData.rank || formData.department) {
      setFormData((prev) => ({
        ...prev,
        postingDetails: `${prev.rank || ""}${prev.rank && prev.department ? ", " : ""}${prev.department || ""}`,
      }));
    } else {
      setFormData((prev) => ({ ...prev, postingDetails: "" }));
    }
  }, [formData.rank, formData.department]);

  
  useEffect(() => {
    if (sameAddress) {
      setFormData((prev) => ({ ...prev, presentAddress: prev.permanentAddress }));
    }
  }, [sameAddress, formData.permanentAddress]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSameAddress = () => {
    setSameAddress((prev) => {
      const newVal = !prev;
      setFormData((fd) => ({
        ...fd,
        presentAddress: newVal ? fd.permanentAddress : "",
      }));
      return newVal;
    });
  };

  const handleFile = (file) => {
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file,
        photoPreview: URL.createObjectURL(file),
      }));
      setErrors((prev) => ({ ...prev, photo: undefined }));
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const validateForm = () => {
    const required = [
      "officerType",
      "officerId",
      "title",
      "name",
      "fatherSpouse",
      "dob",
      "gender",
      "phone",
      "permanentAddress",
      "presentAddress",
      "joiningDate",
      "department",
      "subDepartment",
      "section",
      "rank",
      "role",
      "photo",
    ];

    const newErrors = {};
    required.forEach((f) => {
      if (!formData[f]) newErrors[f] = "This field is required";
    });

    if (formData.aadhaar && formData.aadhaar.length !== 12) {
      newErrors.aadhaar = "Aadhaar must be 12 digits";
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  
  if (!formData.photo) {
    alert("Please upload a photo");
    return;
  }

  try {
    const payload = new FormData();

    
    const { photo, photoPreview, ...jsonData } = formData;

    
    payload.append(
      "data",
      JSON.stringify(jsonData)
    );

    
    payload.append("photo", photo);

    const response = await fetch(
      "http://localhost:8081/api/registrations",
      {
        method: "POST",
        body: payload
        
      }
    );

    if (!response.ok) {
      throw new Error("Failed to submit registration");
    }

    const result = await response.json();
    console.log("Saved:", result);

    // alert("Registration submitted successfully");
    toast.success("Registration submitted successfully");

  } catch (error) {
    console.error(error);
    toast.error("Error submitting registration");
  }
};


  return (
    <div className="registration-page bg-light min-vh-100 py-4">
      <div className="container-fluid px-4">
        <div className="row justify-content-center">
          <div className="col-12">
            <h2 className="text-primary mb-4 text-center">New Officer Registration Form</h2>
            <form onSubmit={handleSubmit} className="form-container p-4">

             
              <h5 className="text-secondary mb-3">Personal Details</h5>

              <div className="row g-3 mb-2">
                <div className="col-md-4">
                  <label className="form-label">Officer Type *</label>
                  <select className={`form-select ${errors.officerType ? 'is-invalid' : ''}`} required name="officerType" value={formData.officerType} onChange={handleChange}>
                    <option value="">Select</option>
                    <option>Permanent</option>
                    <option>Temporary</option>
                  </select>
                  {errors.officerType && <div className="text-danger small mt-1">{errors.officerType}</div>}
                </div>

                <div className="col-md-4">
                  <label className="form-label">Officer ID *</label>
                  <input className={`form-control ${errors.officerId ? 'is-invalid' : ''}`} required name="officerId" value={formData.officerId} onChange={handleChange} />
                  {errors.officerId && <div className="text-danger small mt-1">{errors.officerId}</div>}
                </div>

                <div className="col-md-4">
                  <label className="form-label">Aadhaar Number</label>
                  <input className={`form-control ${errors.aadhaar ? 'is-invalid' : ''}`} maxLength="12" name="aadhaar" value={formData.aadhaar} onChange={handleChange} />
                  {errors.aadhaar && <div className="text-danger small mt-1">{errors.aadhaar}</div>}
                </div>
              </div>

              <div className="row g-3 mb-2">
                <div className="col-md-2">
                  <label className="form-label">Title *</label>
                  <select className={`form-select ${errors.title ? 'is-invalid' : ''}`} required name="title" value={formData.title} onChange={handleChange}>
                    <option value="">Select</option>
                    <option>Dr</option>
                    <option>Sri</option>
                    <option>Smt</option>
                    <option>Ms</option>
                  </select>
                  {errors.title && <div className="text-danger small mt-1">{errors.title}</div>}
                </div>

                <div className="col-md-5">
                  <label className="form-label">Name *</label>
                  <input className={`form-control ${errors.name ? 'is-invalid' : ''}`} required name="name" value={formData.name} onChange={handleChange} />
                  {errors.name && <div className="text-danger small mt-1">{errors.name}</div>}
                </div>

                <div className="col-md-5">
                  <label className="form-label">Father / Spouse Name *</label>
                  <input className={`form-control ${errors.fatherSpouse ? 'is-invalid' : ''}`} required name="fatherSpouse" value={formData.fatherSpouse} onChange={handleChange} />
                  {errors.fatherSpouse && <div className="text-danger small mt-1">{errors.fatherSpouse}</div>}
                </div>
              </div>

              <div className="row g-3 mb-2">
                <div className="col-md-6">
                  <label className="form-label">Date of Birth *</label>
                  <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-calendar3" aria-hidden="true"></i></span>
                    <input type="date" className={`form-control ${errors.dob ? 'is-invalid' : ''}`} max="2007-12-31" required name="dob" value={formData.dob} onChange={handleChange} />
                    {errors.dob && <div className="text-danger small mt-1">{errors.dob}</div>}
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Gender *</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-person-circle" aria-hidden="true"></i></span>
                    <select className={`form-select ${errors.gender ? 'is-invalid' : ''}`} required name="gender" value={formData.gender} onChange={handleChange}>
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                    {errors.gender && <div className="text-danger small mt-1">{errors.gender}</div>}
                  </div>
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label">Phone No *</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-telephone-fill" aria-hidden="true"></i></span>
                    <input className={`form-control ${errors.phone ? 'is-invalid' : ''}`} required name="phone" value={formData.phone} onChange={handleChange} />
                    {errors.phone && <div className="text-danger small mt-1">{errors.phone}</div>}
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Mail ID</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-envelope-fill" aria-hidden="true"></i></span>
                    <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
                  </div>
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label">Permanent Address *</label>
                  <textarea className={`form-control ${errors.permanentAddress ? 'is-invalid' : ''}`} rows="3" required name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} />
                  {errors.permanentAddress && <div className="text-danger small mt-1">{errors.permanentAddress}</div>}
                </div>

                <div className="col-md-6">
                  <label className="form-label">Present Address *</label>
                  <div className="d-flex justify-content-end mb-1">
                    <div className="form-check small-check">
                      <input className="form-check-input small-input" type="checkbox" checked={sameAddress} onChange={handleSameAddress} id="sameAddressChk" />
                      <label className="form-check-label small-label" htmlFor="sameAddressChk">Same as Permanent</label>
                    </div>
                  </div>
                  <textarea className={`form-control ${errors.presentAddress ? 'is-invalid' : ''}`} rows="3" required name="presentAddress" value={formData.presentAddress} onChange={handleChange} />
                  {errors.presentAddress && <div className="text-danger small mt-1">{errors.presentAddress}</div>}
                </div>
              </div>

             
              <h5 className="text-secondary mt-4 mb-3">Professional Details</h5>

              <div className="row g-3 mb-2">
                <div className="col-md-4">
                  <label className="form-label">Joining Date *</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-calendar3" aria-hidden="true"></i></span>
                    <input type="date" className={`form-control ${errors.joiningDate ? 'is-invalid' : ''}`} min={minJoiningDate} max={new Date().toISOString().split("T")[0]} required name="joiningDate" value={formData.joiningDate} onChange={handleChange} />
                    {errors.joiningDate && <div className="text-danger small mt-1">{errors.joiningDate}</div>}
                  </div>
                </div>

                <div className="col-md-4">
                  <label className="form-label">Department Name *</label>
                  <select className={`form-select ${errors.department ? 'is-invalid' : ''}`} required name="department" value={formData.department} onChange={handleChange}>
                    <option value="">Select</option>
                    <option>Commissioner of Commercial Taxes</option>
                  </select>
                  {errors.department && <div className="text-danger small mt-1">{errors.department}</div>}
                </div>

                <div className="col-md-4">
                  <label className="form-label">Sub Department *</label>
                  <select className={`form-select ${errors.subDepartment ? 'is-invalid' : ''}`} required name="subDepartment" value={formData.subDepartment} onChange={handleChange}>
                    <option value="">Select</option>
                    <option>Head Office</option>
                  </select>
                  {errors.subDepartment && <div className="text-danger small mt-1">{errors.subDepartment}</div>}
                </div>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-3">
                  <label className="form-label">Section Name *</label>
                  <select className={`form-select ${errors.section ? 'is-invalid' : ''}`} required name="section" value={formData.section} onChange={handleChange}>
                    <option value="">Select</option>
                    <option>G Section</option>
                    <option>A Section</option>
                    <option>C Section</option>
                    <option>HOD</option>
                  </select>
                  {errors.section && <div className="text-danger small mt-1">{errors.section}</div>}
                </div>

                <div className="col-md-3">
                  <label className="form-label">Rank / Post Name *</label>
                  <select className={`form-select ${errors.rank ? 'is-invalid' : ''}`} required name="rank" value={formData.rank} onChange={handleChange}>
                    <option value="">Select</option>
                    <option>Assistant Commercial Tax Officer</option>
                    <option>Assistant Commissioner</option>
                  </select>
                  {errors.rank && <div className="text-danger small mt-1">{errors.rank}</div>}
                </div>

                <div className="col-md-3">
                  <label className="form-label">Deputation</label>
                  <select className={`form-select ${errors.deputation ? 'is-invalid' : ''}`} name="deputation" value={formData.deputation} onChange={handleChange}>
                    <option value="">Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                  {errors.deputation && <div className="text-danger small mt-1">{errors.deputation}</div>}
                </div>

                <div className="col-md-3">
                  <label className="form-label">Employee Role *</label>
                  <select className={`form-select ${errors.role ? 'is-invalid' : ''}`} required name="role" value={formData.role} onChange={handleChange}>
                    <option value="">Select</option>
                    <option>Applier</option>
                    <option>Approver</option>
                  </select>
                  {errors.role && <div className="text-danger small mt-1">{errors.role}</div>}
                </div>
              </div>

              <div className="row g-3 align-items-center mb-4">
                <div className="col-md-8">
                  <label className="form-label">Posting Details *</label>
                  <input className="form-control" readOnly value={formData.postingDetails} />
                </div>

                <div className="col-md-4">
                  <label className="form-label d-block">Upload Photo *</label>
                  <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoUpload} />
                  <div className="d-flex gap-3 align-items-start">
                    <div className="file-drop-zone p-2 border rounded text-start flex-grow-1" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                      <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-cloud-arrow-up-fill" aria-hidden="true"></i>
                        <span className="small text-muted">{formData.photo ? formData.photo.name : 'Drag & drop photo or click to select'}</span>
                      </div>
                    </div>

                    <div className="preview-box d-flex align-items-center justify-content-center">
                      {formData.photoPreview ? (
                        <img src={formData.photoPreview} alt="Preview" className="img-thumbnail preview-img" />
                      ) : (
                        <div className="preview-placeholder small text-muted">Preview</div>
                      )}
                    </div>
                  </div>
                  {errors.photo && <div className="text-danger small mt-1">{errors.photo}</div>}
                </div>
              </div>

              <div className="text-center mt-3">
                <button type="submit" className="btn btn-success px-5">Submit Details</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOfficerRegistrationForm;
