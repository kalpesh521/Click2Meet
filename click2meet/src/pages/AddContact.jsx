import React, { useRef } from "react";
import ContactForm from "../components/ContactForm";
import { useDispatch} from "react-redux";
import { addContact } from "../features/contacts/userReducer";
import { useNavigate } from "react-router-dom";
import "../assets/css/AddContact.css";
import contactUsImg from "../assets/images/contact-us-image.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import useIsMobileBtn from "../hook/useIsMobileBtn";

const AddContact = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const navigate = useNavigate();
  const isMobileBtn = useIsMobileBtn();

  const focusFirstName = location.state?.focusFirstName || false;
  const handleScheduleClick = () => {
    navigate("/", { state: { focusFirstName: true } });
  };
  const handleSubmit = (contact) => {
    const newContact = { ...contact, id: Date.now() };
    dispatch(addContact(newContact));

    toast.success("Contact submitted successfully!", {
      position: "bottom-right",
      autoClose: 3000,
      style: {
        backgroundColor: "#4CAF50",
        color: "#fff",
        fontWeight: "bold",
      },
      theme: "colored",
    });

    if (formRef.current) {
      formRef.current.resetForm();
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-wrapper">
        <h1>Partner with Experts Committed to Your Growth</h1>
        <p>
          Schedule a personalized meeting with our experts to explore tailored
          solutions that align with your business goals.
        </p>
        {isMobileBtn && (
          <button
            className="talk-btn"
            type="primary"
            onClick={handleScheduleClick}
          >
            Talk to an Expert
          </button>
        )}
        <img src={contactUsImg} alt="Contact us" />
      </div>
      <div className="form-wrapper">
        <ContactForm
          ref={formRef}
          onSubmit={handleSubmit}
          focusFirstName={focusFirstName}
          submitText="Schedule a Meeting"
        />
      </div>
    </div>
  );
};

export default AddContact;
