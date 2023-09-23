import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

const Details = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      businessName,
      description,
      budget,
    };

    try {
      // Send a POST request to your API endpoint
      const response = await axios.post("/your-api-endpoint", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Data sent successfully!", response.data);

      // Optionally, you can navigate to a different page after successful submission
      navigate("/success");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGoBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="grid place-items-center">
      <div className="mt-24 h-[120vh] w-2/3 border-2 rounded-lg">
        <h1 className="font-semibold text-xl text-center py-2">
          Get Guidance by Filling in Details
        </h1>
        <h2 className="ml-4 cursor-pointer" onClick={handleGoBack}>
          <span className="font-bold">Go Back</span> To Dashboard
        </h2>
        <div className="py-4 px-4 w-full">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              <label htmlFor="businessName">Business Name</label>
              <input
                type="text"
                id="businessName"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full bg-blue-200 rounded-lg p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description">PR Goals</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-blue-200 rounded-lg p-2"
                rows="4"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="budget">What is your budget:</label>
              <select
                onChange={(e) => setBudget(e.target.value)}
                value={budget}
                className="border-2 border-blue-800 rounded-lg h-10 py-2 px-4"
              >
                <option>Below 5000</option>
                <option>5000 - 15000</option>
                <option>15000 - 35000</option>
                <option>35000 - 55000</option>
                <option>Over 55000</option>
              </select>
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

export default Details;
