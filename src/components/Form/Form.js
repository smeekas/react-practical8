import styles from "./Form.module.css";
import Button from "../../components/UI/Button/Button";
import { useDispatch } from "react-redux";
import { userActionTypes } from "../../actionTypes/userActionTypes";
import { useState, useRef } from "react";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import InputField from "../../components/Inputfield/InputField";
import { useHistory } from "react-router-dom";
import { addData } from "../../services/localStorage";
const Form = () => {
  const histroy = useHistory();
  const inputFileRef = useRef();
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState(null);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name required"),
    email: Yup.string().email().required("Email required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter valid phone number")
      .required("Phone number required"),
    pass: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/,
        "Upper Lower and number "
      )
      .required("Password  required"),
    confirmPass: Yup.string()
      .oneOf([Yup.ref("pass"), null], "Passwords must match")
      .required("Confirm password required"),
    photo: Yup.mixed()
      .required("Image required")
      .test("fileSize", "Image size must be < 2 MB", (value) => {
        return value && value.size <= 2000000;
      }),
  });
  const initialValues = {
    name: "abc ",
    email: "abc@abc.com",
    phone: "1234567890",
    pass: "Smeet123",
    confirmPass: "Smeet123",
    photo: "",
  };
  const onSubmit = async (values) => {
    dispatch({
      type: userActionTypes.ADD_USER_DATA,
      userData: {
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.pass,
        photo: URL.createObjectURL(inputFileRef.current.files[0]),
        auth: true,
      },
    });
    addData({
      name: values.name,
      email: values.email,
      phone: values.phone,
      password: values.pass,
      photo: URL.createObjectURL(inputFileRef.current.files[0]),
      auth: true,
    });
    histroy.replace("home");
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: validationSchema,
  });

  const fileInputHandler = (event) => {
    if (event.target.files[0]) {
      setPhoto(URL.createObjectURL(event.target.files[0]));
      formik.setTouched({ ...formik.touched, photo: true });
      formik.setFieldValue("photo", event.target.files[0]);
    }
  };
  const resetErrorHandler = () => {
    setPhoto(null);
    formik.setErrors({});
    formik.resetForm({});
  };
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <section className={styles.filePicker}>
          <div className={styles.filePhoto}>
            <input
              // className={styles.fileInput}
              ref={inputFileRef}
              style={{ display: "none" }}
              type="file"
              name="photo"
              accept=".jpg, .png"
              onChange={fileInputHandler}
              onBlur={formik.handleBlur}
            />
            <Button
              type="button"
              className={styles.fileButton}
              onClick={() => inputFileRef.current.click()}
              onBlur={formik.handleBlur}
            >
              Photo +
            </Button>
            {photo ? (
              <img className={styles.photo} src={photo} alt="pic" />
            ) : (
              <div className={styles.photoReplacement}></div>
            )}
          </div>
          {formik.errors.photo && formik.touched.photo && (
            <p className={styles.fileError}>{formik.errors.photo}</p>
          )}
        </section>
        <section>
          <InputField
            labelName="name"
            labelValue="Name"
            inputType="text"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            error={{
              show: formik.errors.name && formik.touched.name,
              message: formik.errors.name,
            }}
          />

          <InputField
            labelName="email"
            labelValue="Email"
            inputType="email"
            onBlur={formik.handleBlur}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={{
              show: formik.errors.email && formik.touched.email,
              message: formik.errors.email,
            }}
          />

          <InputField
            labelName="phone"
            labelValue="PhoneNo"
            inputType="tel"
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={{
              show: formik.errors.phone && formik.touched.phone,
              message: formik.errors.phone,
            }}
          />

          <InputField
            labelName="pass"
            labelValue="Password"
            inputType="password"
            onBlur={formik.handleBlur}
            value={formik.values.pass}
            onChange={formik.handleChange}
            error={{
              show: formik.errors.pass && formik.touched.pass,
              message: formik.errors.pass,
            }}
          />

          <InputField
            labelName="confirmPass"
            labelValue="Confirm Passoword"
            inputType="password"
            onBlur={formik.handleBlur}
            value={formik.values.confirmPass}
            onChange={formik.handleChange}
            error={{
              show: formik.errors.confirmPass && formik.touched.confirmPass,
              message: formik.errors.confirmPass,
            }}
          />
        </section>
        <section className={styles["form-action"]}>
          <Button className={`${styles.button} ${styles.submit}`} type="submit">
            Submit
          </Button>

          <Button
            className={`${styles.button} ${styles.reset}`}
            onClick={resetErrorHandler}
            type="reset"
          >
            Reset
          </Button>
        </section>
      </form>
    </>
  );
};
export default React.memo(Form);
