import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Courses from './Courses.js';
import Loading from './Loading.js';

function App() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);


  const deleteCourse = (id) => {
    const afterDeletedCourses = courses.filter((course)=> course.id !== id); //idleri olanı yeni bi arreye atıyo (silinenleri yeniye atıyo)
    setCourses(afterDeletedCourses)
  }


  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/courses');
      setCourses(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="App">
      {loading ? ( 
        <Loading /> 
      ): (
        <>
          {courses.length === 0 ? (  //tüm elemanlar silinince fetchCoursesile zaten elemanları alıyoruz o yüzden tekrar component yapmıyoruz
            <div className='refleshDiv'>
              <h2 >Kursların hepsini sildin!</h2>
              <button className='refleshDivBtn' onClick={()=>{fetchCourses()}}>Yenile</button>
            </div>
          ) : (<Courses courses={courses} removeCourse={deleteCourse} />) //data yüklenmemiş ama elaman var ise
          }
        </>
      )}
    </div>
  );
}

export default App;
