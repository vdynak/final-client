/*==================================================
NewStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student page.
================================================== */
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import './styles/NewStudent.css';

const NewStudentView = ({ handleSubmit, handleChange, errors = {} }) => {
  return (
    <div className="form-container">
      <h2 className="form-title">Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name<span className="required">*</span></label>
          <input
            type="text"
            name="firstname"
            onChange={handleChange}
            className={errors.firstname ? "error" : ""}
          />
          {errors.firstname && <span className="error-message">{errors.firstname}</span>}
        </div>

        <div className="form-group">
          <label>Last Name<span className="required">*</span></label>
          <input
            type="text"
            name="lastname"
            onChange={handleChange}
            className={errors.lastname ? "error" : ""}
          />
          {errors.lastname && <span className="error-message">{errors.lastname}</span>}
        </div>

        <div className="form-group">
          <label>Email<span className="required">*</span></label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className={errors.email ? "error" : ""}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>GPA</label>
          <input
            type="number"
            name="gpa"
            step="0.1"
            min="0"
            max="4"
            onChange={handleChange}
            className={errors.gpa ? "error" : ""}
          />
          {errors.gpa && <span className="error-message">{errors.gpa}</span>}
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="url"
            name="imageUrl"
            onChange={handleChange}
            className={errors.imageUrl ? "error" : ""}
            placeholder="https://example.com/image.jpg"
          />
          {errors.imageUrl && <span className="error-message">{errors.imageUrl}</span>}
        </div>

        <div className="form-group">
          <label>Campus ID</label>
          <input
            type="number"
            name="campusId"
            onChange={handleChange}
            className={errors.campusId ? "error" : ""}
          />
          {errors.campusId && <span className="error-message">{errors.campusId}</span>}
        </div>

        {errors.submit && <div className="error-message">{errors.submit}</div>}

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default NewStudentView;