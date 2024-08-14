import { isValidElement, useState } from "react"

export default function Qr_gen() {
  const [img,Setimg]=useState("")
  const [load,setload]=useState(false)
  const [data,setdata]=useState("https://www.linkedin.com/in/senduru/")
  const [size,setsize]=useState("200")
  const [down,setdown]=useState(true)
  const audio = new Audio('sound/btn1.mp3');
  const audio1 =new Audio("sound/btn2.mp3")
  function generateQr(){
    setload(true)
    
    try{
      const url=`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`;
      Setimg(url);
      setdown(false);
    }catch(error){
      console.log("somethig want wrong the problem is:",error);
    }finally{
      setload(false)
      audio.play();
    }
  }
  function downloadfun()
  {

    fetch(img).then((Response)=>Response.blob()).then((blob)=>{
      const link=document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download="QR_img.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setdown(true)
      audio1.play();
    })
  }
  return (
    <div className="app-container">
        <h1>QR Genarator</h1>
        {img && <img src={img} className="qr-img"/>}
        {load && <p className="waited">please wait..</p>}
        <div>
             <label htmlFor="datainput" className="input-label">Enter your QR data</label>
             <input type="text" id="datainput" placeholder="Enter the Data" value={data} onChange={(e)=>setdata(e.target.value)} />
             <label htmlFor="sizeinput"className="input-label">Enter the image size</label>
             <input type="text" id="datainput" placeholder="Enter The Image Size Ex:150" value={size} onChange={(e)=>setsize(e.target.value)}/>
             <button className="generae-btn" onClick={generateQr} disabled={load}>Genarate QR</button>
             <button className="download-btn" onClick={downloadfun} disabled={down}>Download QR</button>
        </div>
        <div className="Footer">
          <p>Developed by <a href="https://www.linkedin.com/in/senduru/"> @Senduru</a></p>
        </div>
    </div>
  )
}
