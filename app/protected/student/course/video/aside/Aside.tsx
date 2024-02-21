import './aside.css'

export default function Aside(props:any) {
    console.log("course content", props)
    return (
        <div className='aside'>
            <div>
                <h2>Video Content</h2>
                <p>X</p>
            </div>

            <ol>
                {props.videos?.videos?.map((item:any, i:number) => (
                    <li key={i}>
              
                    <div>
                        <p>{item.title}</p>
                        
                        <div>
                        <span className='material-icons' style={{transform: 'scale(.7)'}}>ondemand_video</span>
                        <p>{item.duration}</p>
                        </div>
                    </div>
                </li>
                ))}
                
            </ol>
        </div>
    );
}