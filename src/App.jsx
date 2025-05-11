import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const themes = [
    "bg-white text-black",         
    "bg-gray-800 text-white",      
    "bg-blue-200 text-blue-800",   
  ];
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);
  const [line1,setLine1] = useState('')
  const [line2,setLine2] = useState('');

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  function handleSubmit(){
    alert("Order placed")
  }

  useEffect(() => {
    const handleThemeSwitch = (event) => {
      if (event.altKey && event.code==='KeyQ') {
        setThemeIndex((prevIndex) => (prevIndex + 1) % themes.length);
      }
    };
    window.addEventListener("keydown", handleThemeSwitch);
    return () => window.removeEventListener("keydown", handleThemeSwitch);
  }, []);
  //className='border-dotted border-2 rounded-md flex flex-col items-center gap-4 justify-center' 

  return (
    <div className={`px-64 py-8 ${image? 'h-[100%]':'h-[100vh]'} flex flex-col items-center ${themes[themeIndex]}`}>
     <div className='flex gap-8 flex-col md:flex-row justify-center items-center'>
        <div onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`mb-4 flex flex-col gap-4 items-center justify-center border-2 ${
          isDragging ? "border-blue-500 bg-blue-100" : "border-dashed"
        } rounded-lg w-64 h-64`}>
          <div>
            {image? <img src={image} className='rounded-md h-20 w-20'/>:
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            }
          </div>
          <div>Drop an image here or</div>
          <div><label className='cursor-pointer'> <input type='file' className='hidden' onChange={onImageChange}/> Select file</label></div>
        </div>
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
              <label htmlFor='height'>Height (in cm)</label>
              <div>
              <input type='number' defaultValue={'180'} id='height' className='border-1 rounded-md'/>
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor='weight'>Weight (in kg)</label>
              <div>
              <input type='number' defaultValue={'80'} id='weight' className='border-1 rounded-md'/>
              </div>
            </div>
            <div className='flex gap-2'>
              <label htmlFor='build'>Build:</label>
              <div>
              <select className='border-2 rounded-md' id='build'>
                <option>Lean</option>
                <option>Regular</option>
                <option selected>Athletic</option>
                <option>Big</option>
              </select>
              </div>
            </div>
            
          </div>
      </div>
      <div className='w-[28vw] mt-8'>
        <img src={image || ''} alt='' className='rounded-md'/>
      </div>
      <div className='flex flex-col gap-2 mt-4'>
        <h2 className='text-s'>Include text on the shirt (optional)</h2>
      <div className='gap-2 flex flex-col md:flex-row'>
        <label>Line 1:</label>
        <div>
        <input type='text' className='border-1 rounded-md' value={line1} onChange={e=>setLine1(e.target.value)} maxLength={20}/>
        </div>
      </div>
      <div className={`gap-2 flex flex-col md:flex-row ${line1.length==20?'block':'hidden'}`}>
        <label>Line 2:</label>
        <div>
        <input type='text' className='border-1 rounded-md' value={line2} onChange={e=>setLine2(e.target.value)} maxLength={20}/>
        </div>
      </div>
      <div className={`gap-2 flex flex-col md:flex-row ${line2.length==20?'block':'hidden'}`}>
        <label>Line 3:</label>
        <div>
        <input type='text' className='border-1 rounded-md' maxLength={20}/>
        </div>
      </div>
      </div>
      <div className='mt-4'>
      <button className='bg-blue-800 text-white px-6 py-2 rounded-xl' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default App
