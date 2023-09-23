import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

const Call = () => {
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [date2, setDate2] = useState("");
  const [time2, setTime2] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const timeSlots = [
    "9:00 AM - 9:30 AM",
    "9:30 AM - 10:00 AM",
    "10:00 AM - 10:30 AM",
    "10:30 AM - 11:00 AM",
    "11:00 AM - 11:30 AM",
    "11:30 AM - 12:00 PM",
    "12:00 PM - 12:30 PM",
    "12:30 PM - 1:00 PM",
    "2:00 PM - 2:30 PM",
    "2:30 PM - 3:00 PM",
    "3:00 PM - 3:30 PM",
    "3:30 PM - 4:00 PM",
    "4:00 PM - 4:30 PM",
    "4:30 PM - 5:00 PM",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title,
      firstName,
      lastName,
      email,
      phoneNumber,
      date,
      time,
      date2,
      time2,
      description,
    };

    try {
      const response = await axios.post(
        "https://assist-api-okgk.onrender.com/api/v1/consultation",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Data sent successfully!", response.data);

      navigate("/dashboard");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGoBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="grid place-items-center">
      <div className="mt-24 h-[144vh] w-2/3 border-2 rounded-lg">
        <h1 className="font-semibold text-xl text-center py-2">
          Schedule a Call with an expert
        </h1>
        <h2 className="ml-4 cursor-pointer" onClick={handleGoBack}>
          <span className="font-bold">Go Back</span> To Dashboard
        </h2>
        <div className="py-4 px-4 w-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-blue-200 rounded-lg p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-blue-200 rounded-lg p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-blue-200 rounded-lg p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-blue-200 rounded-lg p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full bg-blue-200 rounded-lg p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-blue-200 rounded-lg p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="date2">Alternate Date (optional)</label>
              <input
                type="date"
                id="date2"
                value={date2}
                onChange={(e) => setDate2(e.target.value)}
                className="w-full bg-blue-200 rounded-lg p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="time">Select Your Preferred Time Slot</label>
              <select
                id="time"
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-blue-200 rounded-lg p-2"
              >
                {timeSlots.map((slot, index) => (
                  <option key={index} value={time}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-blue-200 rounded-lg p-2"
                rows="4"
                required
              />
            </div>
            <button
              type="submit"
              className="w-1/5 rounded-lg border-2 mt-5 py-2 px-4 bg-blue-600 hover:bg-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Call;
