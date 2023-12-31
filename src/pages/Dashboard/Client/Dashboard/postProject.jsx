import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PostProject = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [Services, setServices] = useState("");
  const [skills, setSkills] = useState("");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const userObjectString = localStorage.getItem("user");

  const userObject = JSON.parse(userObjectString);

  const userId = userObject._id;
  const token = userObject.token;
  const userEmail = userObject.email;

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const maxFiles = 5;

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);

    if (uploadedFiles.length + newFiles.length > maxFiles) {
      alert(`You can only upload a maximum of ${maxFiles} files.`);
      return;
    }

    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  const handleFileRemove = (index) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
  };

  const renderUploadedFiles = () => {
    return (
      <div className="flex flex-wrap">
        {uploadedFiles.map((file, index) => (
          <div key={index} className="mb-2 mr-2">
            <p>{file.name}</p>
            <button
              className="text-red-600 hover:text-red-800"
              onClick={() => handleFileRemove(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    );
  };

  const handleSubmit = async (e) => {
    const user_email = userEmail;
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://assist-api-okgk.onrender.com/api/v1/jobs",
        {
          title,
          user_email,
          Services,
          description,
          skills,
          budget,
          duration,
          files: uploadedFiles,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setIsLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="grid place-items-center">
      <div className="mt-24 h-[164vh] w-2/3 border-2 rounded-lg">
        <h1 className="font-semibold text-xl text-center py-2">
          Post a Project
        </h1>
        <form onSubmit={handleSubmit} className="py-4 px-4 w-full">
          <div className="flex flex-col mb-4">
            <label>Title of the project</label>
            <input
              className="border-2 border-purple-800 rounded-lg h-10 py-2 px-4"
              type="text"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="prService">Select PR Service:</label>
            <select
              value={Services}
              onChange={(e) => setServices(e.target.value)}
              className="border-2 border-purple-800 rounded-lg h-10 py-2 px-4">
              <option>Thought Leadership</option>
              <option>Content Creation</option>
              <option>Strategic Communication</option>
            </select>
          </div>
          <div className="flex flex-col mb-4">
            <label>Name of the project</label>
            <input
              className="border-2 border-blue-800 rounded-lg h-10 py-2 px-4"
              type="text"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label>What experience are you looking for</label>
            <select className="border-2 border-blue-800 rounded-lg h-10 py-2 px-4">
              <option>0-1 year</option>
              <option>1-3 years</option>
              <option>3-5 years</option>
              <option>over 5 years</option>
              <option>Any</option>
            </select>
          </div>
          <div className="flex flex-col mb-4">
            <label>Describe the project and what you want done</label>
            <textarea
              value={description}
              className="border-2 rounded-lg border-blue-800 h-40 py-2 px-4"
              type="text"
              placeholder="Details..."
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label>How long should the project take (Days)</label>
            <input
              value={duration}
              className="border-2 border-blue-800 rounded-lg h-10 py-2 px-4"
              type="number"
              placeholder="Timeline"
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label>What is your budget</label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="border-2 border-blue-800 rounded-lg h-10 py-2 px-4"
            >
              <option>Below 5000</option>
              <option>5000 - 15000</option>
              <option>15000 - 35000</option>
              <option>35000 - 55000</option>
              <option>Over 55000</option>
            </select>
          </div>
          <div className="flex flex-col mb-4">
            <label>What experience are you looking for</label>
            <select className="border-2 border-purple-800 rounded-lg h-10 py-2 px-4">
              <option>0-1 year</option>
              <option>1-3 years</option>
              <option>3-5 years</option>
              <option>over 5 years</option>
              <option>Any</option>
            </select>
          </div>
          <div className="flex flex-col mb-4">
            <label>What skills are required for the project</label>
            <input
              value={skills}
              className="border-2 border-purple-800 rounded-lg h-10 py-2 px-4"
              type="text"
              placeholder="Skills"
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label>Upload up to 5 relevant files</label>
            <input
              multiple
              className="border-2 border-blue-800 rounded-lg h-12 py-2 px-4"
              type="file"
              onChange={handleFileChange}
            />
          </div>
          {renderUploadedFiles()}
          <button
            className="w-2/5 rounded-lg border-2 py-2 px-4 bg-blue-600 hover:bg-blue-800"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostProject;
