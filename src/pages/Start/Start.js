/* eslint-disable react/button-has-type */
import React from 'react';
import { Link } from 'react-router-dom';

import './Start.scss';
import illustration from '../../assets/illustration.png';
import Footer from '../../components/Footer/Footer'

const Start = () => {
  return (
    <div className="start">
      <div className="img-container">
        <img src={illustration} alt="illustration" />
      </div>
      <div className="content">
        <div className="text-container">
          <h1>Join suscipit arcu congue porttitor.</h1>
          <p>
            Aliquam vitae sed eu amet tristique enim. Tempus nisl placerat purus
            nullam tristique scelerisque. Adipiscing mattis ut sed massa.
          </p>
        </div>
        <div className="link-container">
          <Link to="/register">
            <button>sign up</button>
          </Link>
          <p>
            Already have an account?
            <Link className="link" to="/signin">
              sign in
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Start;
