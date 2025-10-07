import React, { useEffect, useState } from 'react';
import SharedCseLayout from './SharedCseLayout';
import styles from './CseFaculty.module.css';

// Import all images at the top
import sunilSinghImg from '../../assets/CSE-Department/sunil_k_singh.jpg';
import manpreetGujralImg from '../../assets/CSE-Department/principal.jpg';
import rbPatelImg from '../../assets/CSE-Department/rb_patel.jpg';
import varunGuptaImg from '../../assets/CSE-Department/varun_gupta.jpg';
import dheerendraSinghImg from '../../assets/CSE-Department/d_singh.jpg';
import gulshanGoyalImg from '../../assets/CSE-Department/gulshan_goyal.jpg';
import sunitaImg from '../../assets/CSE-Department/sunita_prashar.jpg';
import amitChhabraImg from '../../assets/CSE-Department/amit_chhabra.jpg';
import ankitGuptaImg from '../../assets/CSE-Department/ankit_gupta.jpg';
import sarabjeetSinghImg from '../../assets/CSE-Department/sarabjeet_singh.jpg';
import sudhakarKumarImg from '../../assets/CSE-Department/sudhakar_kumar.jpg';
import animeshSinghImg from '../../assets/CSE-Department/AnimeshSingh.jpg';

// Map filename (as in API) to the imported image
const imageMap = {
  "sunil_k_singh.jpg": sunilSinghImg,
  "principal.jpg": manpreetGujralImg,
  "rb_patel.jpg": rbPatelImg,
  "varun_gupta.jpg": varunGuptaImg,
  "d_singh.jpg": dheerendraSinghImg,
  "gulshan_goyal.jpg": gulshanGoyalImg,
  "sunita_prashar.jpg": sunitaImg,
  "amit_chhabra.jpg": amitChhabraImg,
  "ankit_gupta.jpg": ankitGuptaImg,
  "sarabjeet_singh.jpg": sarabjeetSinghImg,
  "sudhakar_kumar.jpg": sudhakarKumarImg,
  "AnimeshSingh.jpg": animeshSinghImg,
};

const CseFaculty = () => {
  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://ccet.ac.in/api/faculty-cse.php')
      .then(res => res.json())
      .then(data => {
        setFacultyData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className={styles.pageContainer}>Loading...</div>;
  }

  return (
    <SharedCseLayout pageTitle="Faculty">
      <div className={styles.pageContainer}>
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Our Faculty</h1>
          <div className={styles.titleUnderline}></div>
        </header>
        <main className={styles.facultyCards}>
          {facultyData.map((faculty, idx) => (
            <article key={idx} className={styles.facultyCard}>
              <div className={styles.cardHeader}>
                <div className={styles.profileImageContainer}>
                  <div className={styles.profileBg}></div>
                  <img
                    className={styles.profileImg}
                    src={
                      faculty.img
                        ? imageMap[faculty.img.split('/').pop()] || manpreetGujralImg
                        : manpreetGujralImg
                    }
                    alt={faculty.name}
                  />
                </div>
                <div className={styles.facultyInfo}>
                  <h2 className={styles.facultyName}>{faculty.name}</h2>
                  <p className={styles.facultyTitle}>{faculty.designation}</p>
                </div>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.infoSection}>
                  <h3 className={styles.sectionTitle}>Qualifications:</h3>
                  <p className={styles.sectionContent}>{faculty.edu}</p>
                </div>
                <div className={styles.infoSection}>
                  <h3 className={styles.sectionTitle}>Area of Specialization:</h3>
                  <p className={styles.sectionContent}>{faculty.interest}</p>
                </div>
                <div className={styles.infoSection}>
                  <h3 className={styles.sectionTitle}>Additional Roles:</h3>
                  <p className={styles.sectionContent}>{faculty.add_role}</p>
                </div>
                <div className={styles.infoSection}>
                  <h3 className={styles.sectionTitle}>Contact</h3>
                  <div className={styles.contactInfo}>
                    <div className={styles.contactItem}><span>{faculty.email}</span></div>
                    <div className={styles.contactItem}><span>{faculty.number}</span></div>
                    <div className={styles.contactItem}><span>{faculty.address}</span></div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </main>
      </div>
    </SharedCseLayout>
  );
};

export default CseFaculty;