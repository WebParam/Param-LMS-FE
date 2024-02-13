import './aside.css'

export default function Aside() {
    return (
        <div className='aside'>
            <div>
                <h2>Video Content</h2>
                <p>X</p>
            </div>

            <ol>
                {[1,2].map((item => (
                    <li>
                    <p>
                        <span className='material-icons'>play_circle_outline</span>
                    </p>
                    <div >
                        <p> Security Groups & Classic Ports Overview</p>
                        
                        <div>
                        <span className='material-icons' style={{transform: 'scale(.7)'}}>ondemand_video</span>
                        <p>7 min</p>
                        </div>
                    </div>
                </li>
                ))

                )}
                
            </ol>
        </div>
    );
}