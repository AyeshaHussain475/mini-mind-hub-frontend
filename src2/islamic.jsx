import React from 'react';

const Islamic = () => {
    return (
        <div style={{ backgroundImage: 'url(bg8.jpg)', padding: '20px', minHeight: '100vh' }}>
        {/* Embedded YouTube videos side by side */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            {/* Left video */}
            <div style={{ flex: '1', padding: '10px', textAlign: 'center' }}>
                <iframe 
                    width="100%" 
                    height="315" 
                    src="https://www.youtube.com/embed/uuno5fjw_bA?si=JswEtdzvlVZm6stL" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                </iframe>
            </div>

            {/* Middle video */}
            <div style={{ flex: '1', padding: '10px', textAlign: 'center' }}>
                <iframe 
                    width="100%" 
                    height="315" 
                    src="https://www.youtube.com/embed/otOPjLkUbuw" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                </iframe>
            </div>

            {/* Right video */}
            <div style={{ flex: '1', padding: '10px', textAlign: 'center' }}>
                <iframe 
                    width="100%" 
                    height="315" 
                    src="https://www.youtube.com/embed/AwW8s_r4g4w"
 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                </iframe>
            </div>
        </div>
    

            {/* Section with audios for English, Arabic, and Urdu */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                {/* Prayer image on the left */}
                <div style={{ textAlign: 'center', width: '50%', padding: '20px' }}>
                    <img src="/image13.jpg" alt="Prayer after a dream" style={{ width: '100%', height: 'auto', marginBottom: '20px' }} />
                </div>

                {/* Audios on the right */}
                <div style={{ textAlign: 'center', width: '40%', padding: '20px' }}>
                    <h3>Audio of Prayer After Having a Good Dream</h3>
                    {/* English Translation */}
                    <h4>English Translation</h4>
                    <audio controls>
                        <source src="image3.wav" type="audio/wav" />
                        Your browser does not support the audio element.
                    </audio>

                    {/* Arabic */}
                    <h4>Arabic</h4>
                    <audio controls>
                        <source src="/image31.wav" type="audio/wav" />
                        Your browser does not support the audio element.
                    </audio>

                    {/* Urdu Translation */}
                    <h4>Urdu Translation</h4>
                    <audio controls>
                        <source src="/image32.wav" type="audio/wav" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            </div>

            {/* Section with audios for English, Arabic, and Urdu */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                {/* Prayer image on the left */}
                <div style={{ textAlign: 'center', width: '50%', padding: '20px' }}>
                    <img src="/image11.jpg" alt="Prayer after a dream" style={{ width: '100%', height: 'auto', marginBottom: '20px' }} />
                </div>

                {/* Audios on the right */}
                <div style={{ textAlign: 'center', width: '40%', padding: '20px' }}>
                    <h3>Audio of Prayer After Having a Good Dream</h3>
                    {/* English Translation */}
                    <h4>English Translation</h4>
                    <audio controls>
                        <source src="/image2.wav" type="audio/wav" />
                        Your browser does not support the audio element.
                    </audio>

                    {/* Arabic */}
                    <h4>Arabic</h4>
                    <audio controls>
                        <source src="/image21.wav" type="audio/wav" />
                        Your browser does not support the audio element.
                    </audio>

                    {/* Urdu Translation */}
                    <h4>Urdu Translation</h4>
                    <audio controls>
                        <source src="/image22.wav" type="audio/wav" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            </div>

            {/* Islamic Content heading */}
            <h2 style={{ textAlign: 'center' }}>Islamic Content</h2>
            <p style={{ textAlign: 'center' }}>This is some content related to Islam, including teachings, history, and more.</p>

            {/* Existing hadis images in rows */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: '20px' }}>
                <img src="/hadis0.jpg" alt="Hadis 0" style={{ width: '200px', height: 'auto', margin: '10px' }} />
                <img src="/hadis1.jpg" alt="Hadis 1" style={{ width: '200px', height: 'auto', margin: '10px' }} />
                <img src="/hadis4.jpg" alt="Hadis 4" style={{ width: '200px', height: 'auto', margin: '10px' }} />
                <img src="/hadis3.jpg" alt="Hadis 3" style={{ width: '200px', height: 'auto', margin: '10px' }} />
                <img src="/hadiss.jpg" alt="Hadis S" style={{ width: '200px', height: 'auto', margin: '10px' }} />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: '20px' }}>
                <img src="/hadis5.jpg" alt="Hadis 5" style={{ width: '200px', height: 'auto', margin: '10px' }} />
                <img src="/hadis6.jpg" alt="Hadis 6" style={{ width: '200px', height: 'auto', margin: '10px' }} />
                <img src="/hadis7.jpg" alt="Hadis 7" style={{ width: '200px', height: 'auto', margin: '10px' }} />
                <img src="/hadis8.jpg" alt="Hadis 8" style={{ width: '200px', height: 'auto', margin: '10px' }} />
                <img src="/hadis9.jpg" alt="Hadis 9" style={{ width: '200px', height: 'auto', margin: '10px' }} />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: '20px' }}>
                <img src="/hadis10.jpg" alt="Hadis 10" style={{ width: '200px', height: 'auto', margin: '10px' }} />
                <img src="/hadis11.jpg" alt="Hadis 11" style={{ width: '200px', height: 'auto', margin: '10px' }} />
                <img src="/hadis12.jpg" alt="Hadis 12" style={{ width: '200px', height: 'auto', margin: '10px' }} />
                <img src="/hadis13.jpg" alt="Hadis 13" style={{ width: '200px', height: 'auto', margin: '10px' }} />
                <img src="/hadis14.jpg" alt="Hadis 14" style={{ width: '200px', height: 'auto', margin: '10px' }} />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: '20px' }}>
                <img src="/hadis15.jpg" alt="Hadis 15" style={{ width: '200px', height: 'auto', margin: '10px' }} />
                <img src="/hadis16.jpg" alt="Hadis 16" style={{ width: '200px', height: 'auto', margin: '10px' }} />
                <img src="/hadis17.jpg" alt="Hadis 17" style={{ width: '200px', height: 'auto', margin: '10px' }} />
                <img src="/hadis18.jpg" alt="Hadis 18" style={{ width: '200px', height: 'auto', margin: '10px' }} />
                <img src="/hadisss.jpg" alt="Hadis SS" style={{ width: '200px', height: 'auto', margin: '10px' }} />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: '20px' }}>
                <img src="/hadis20.jpg" alt="Hadis 20" style={{ width: '200px', height: 'auto', margin: '10px' }} />
                <img src="/hadissss.jpg" alt="Hadis SSS" style={{ width: '200px', height: 'auto', margin: '10px' }} />
                <img src="/hadis22.jpg" alt="Hadis 22" style={{ width: '200px', height: 'auto', margin: '10px' }} />
                <img src="/hadis23.jpg" alt="Hadis 23" style={{ width: '200px', height: 'auto', margin: '10px' }} />
                <img src="/hadis24.jpg" alt="Hadis 24" style={{ width: '200px', height: 'auto', margin: '10px' }} />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: '20px' }}>
                <img src="/hadi.jpg" alt="Hadis D" style={{ width: '200px', height: 'auto', margin: '10px' }} />
                <img src="/hadissssss.jpg" alt="Hadis SSSS" style={{ width: '200px', height: 'auto', margin: '10px' }} />
                <img src="/hadis27.jpg" alt="Hadis 27" style={{ width: '200px', height: 'auto', margin: '10px' }} />
                <img src="/hadis28.jpg" alt="Hadis 28" style={{ width: '200px', height: 'auto', margin: '10px' }} />
                <img src="/hadis29.jpg" alt="Hadis 29" style={{ width: '200px', height: 'auto', margin: '10px' }} />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: '20px' }}>
                <img src="/hadis30.jpg" alt="Hadis 30" style={{ width: '200px', height: 'auto', margin: '10px' }} />
                <img src="/hadi1.jpg" alt="Hadis D1" style={{ width: '200px', height: 'auto', margin: '10px' }} />
                <img src="/hadi2.jpg" alt="Hadis D2" style={{ width: '200px', height: 'auto', margin: '10px' }} />
                <img src="/hadis33.jpg" alt="Hadis 33" style={{ width: '200px', height: 'auto', margin: '10px' }} />
                <img src="/hadis34.jpg" alt="Hadis 34" style={{ width: '200px', height: 'auto', margin: '10px' }} />
            </div>
        </div>
    );
};

export default Islamic;
