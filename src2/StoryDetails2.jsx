import React, { useState, useRef } from 'react';
import './index.css'; // Ensure you have this CSS file for additional styles

function StoryDetails2() {
    const [previousUploads, setPreviousUploads] = useState([
        { id: 1, name: 'Story 1', image: '/download.jpeg', storyName: 'Story 1', comments: 'This is the first story', liked: false, favorited: false, rating: 3 },
        { id: 2, name: 'Story 2', image: '/s.jpeg', storyName: 'Story 2', comments: 'This is the second story', liked: false, favorited: false, rating: 5 },
        { id: 3, name: 'Story 3', image: '/image3.png', storyName: 'Story 3', comments: 'This is the third story', liked: false, favorited: false, rating: 2 },
    ]);

    const [currentStory, setCurrentStory] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingStoryId, setEditingStoryId] = useState(null);
    const [userName, setUserName] = useState('');
    const [storyName, setStoryName] = useState('');
    const [comments, setComments] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);

    // Filter states
    const [nameFilter, setNameFilter] = useState('');
    const [ratingFilter, setRatingFilter] = useState(0);
    const [sortOrder, setSortOrder] = useState('none'); // For sorting

    // Audio playback reference
    const audioRef = useRef(null); // Initialize as null
    const [isMuted, setIsMuted] = useState(false); // State to manage mute

    const handleViewClick = (story) => {
        setCurrentStory(story);
    };

    const handlePlayAudio = () => {
        if (!audioRef.current) {
            audioRef.current = new Audio('/ac.mp3'); // Update to use ac.wav
            audioRef.current.onerror = () => {
                console.error("Error loading audio file.");
            };
        }
        audioRef.current.muted = isMuted; // Mute or unmute based on state
        audioRef.current.play().catch(err => {
            console.error("Error playing audio: ", err);
        });
    };

    const handleMuteToggle = () => {
        setIsMuted(!isMuted); // Toggle mute state
        if (audioRef.current) {
            audioRef.current.muted = !isMuted; // Mute or unmute audio
        }
    };

    const handleSubmitStory = (e) => {
        e.preventDefault();

        if (isEditing) {
            const updatedUploads = previousUploads.map(story => 
                story.id === editingStoryId ? { id: editingStoryId, name: userName, image: uploadedImage, storyName, comments, liked: story.liked, favorited: story.favorited, rating: story.rating } : story
            );
            setPreviousUploads(updatedUploads);
        } else {
            const newStory = {
                id: previousUploads.length + 1,
                name: userName,
                image: uploadedImage,
                storyName,
                comments,
                liked: false,
                favorited: false,
                rating: 0,
            };
            setPreviousUploads([...previousUploads, newStory]);
        }

        clearForm();
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setUploadedImage(imageUrl);
        }
    };

    const clearForm = () => {
        setUserName('');
        setStoryName('');
        setComments('');
        setUploadedImage(null);
        setIsFormVisible(false);
        setIsEditing(false);
        setEditingStoryId(null);
    };

    const handleEditClick = (story) => {
        setUserName(story.name);
        setStoryName(story.storyName);
        setComments(story.comments);
        setUploadedImage(story.image);
        setIsFormVisible(true);
        setIsEditing(true);
        setEditingStoryId(story.id);
    };

    const handleDeleteClick = (storyId) => {
        const updatedUploads = previousUploads.filter(story => story.id !== storyId);
        setPreviousUploads(updatedUploads);
        if (currentStory && currentStory.id === storyId) {
            setCurrentStory(null);
        }
    };

    const handleLikeClick = (storyId) => {
        const updatedUploads = previousUploads.map(story =>
            story.id === storyId ? { ...story, liked: !story.liked } : story
        );
        setPreviousUploads(updatedUploads);
    };

    const handleFavoriteClick = (storyId) => {
        const updatedUploads = previousUploads.map(story =>
            story.id === storyId ? { ...story, favorited: !story.favorited } : story
        );
        setPreviousUploads(updatedUploads);
    };

    const handleDownloadClick = (imageUrl, storyName) => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `${storyName}.png`;
        link.click();
    };

    const handleRatingClick = (storyId, rating) => {
        const updatedUploads = previousUploads.map(story =>
            story.id === storyId ? { ...story, rating } : story
        );
        setPreviousUploads(updatedUploads);
    };

    // Filtered uploads based on the name and rating
    const filteredUploads = previousUploads.filter(upload => {
        const matchesName = upload.storyName.toLowerCase().includes(nameFilter.toLowerCase());
        const matchesRating = upload.rating >= ratingFilter; // Compare with rating filter
        return matchesName && matchesRating;
    });

    // Sort uploads based on the selected order
    const sortedUploads = [...filteredUploads].sort((a, b) => {
        if (sortOrder === 'name') {
            return a.storyName.localeCompare(b.storyName);
        } else if (sortOrder === 'rating') {
            return b.rating - a.rating; // Sort by rating in descending order
        }
        return 0; // No sorting
    });

    return (
        <div 
            style={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                padding: '20px',
                backgroundImage: 'url(bg.jpg)', // Set the background image
                backgroundSize: 'cover', // Cover the entire background
                backgroundPosition: 'center', // Center the background image
                height: '100vh' // Make sure the div takes full height
            }}
        >
            {/* Combined section for Submitted Story Details and Previous Uploads */}
            <div style={{
                display: 'flex', 
                justifyContent: 'space-between', 
                width: '100%', 
                marginBottom: '20px'
            }}>
                {/* Left side: Current uploaded story */}
                <div style={{
                    backgroundColor: 'rgba(173, 216, 230, 0.8)', // Light blue with transparency
                    padding: '20px',
                    borderRadius: '10px',
                    width: '50%',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    textAlign: 'left',
                }}>
                    <h2>Submitted Story Details</h2>
                    {currentStory ? (
                        <>
                            <p><strong>Name:</strong> {currentStory.name}</p>
                            <p><strong>Story Name:</strong> {currentStory.storyName}</p>
                            <p><strong>Comments:</strong> {currentStory.comments}</p>
                            {currentStory.image && (
                                <div>
                                    <h4>Uploaded Image:</h4>
                                    <img src={currentStory.image} alt="Uploaded" style={{ width: '300px', height: 'auto', border: '1px solid black' }} />
                                    <br />
                                    <button
                                        onClick={() => handleDownloadClick(currentStory.image, currentStory.storyName)}
                                        style={{ padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', marginTop: '10px' }}
                                    >
                                        Download
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <p>No story selected</p>
                    )}
                </div>

                {/* Right side: List of all previous uploaded images */}
                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', // White with transparency
                    padding: '20px',
                    borderRadius: '10px',
                    width: '40%',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    textAlign: 'left',
                    overflowY: 'scroll',
                    height: '500px', // Increased height
                }}>
                    <h2>Previous Uploads</h2>

                    {/* Filter inputs */}
                    <div style={{ marginBottom: '20px' }}>
                        <input
                            type="text"
                            placeholder="Filter by story name"
                            value={nameFilter}
                            onChange={(e) => setNameFilter(e.target.value)}
                            style={{ marginBottom: '10px', width: '100%', padding: '8px' }}
                        />
                        <input
                            type="number"
                            placeholder="Minimum rating (0-5)"
                            value={ratingFilter}
                            onChange={(e) => setRatingFilter(e.target.value)}
                            style={{ marginBottom: '10px', width: '100%', padding: '8px' }}
                            min="0"
                            max="5"
                        />
                        <button
                            onClick={() => {
                                setNameFilter(''); // Clear filter
                                setRatingFilter(0); // Reset rating filter
                            }}
                            style={{ padding: '10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                        >
                            Clear Filters
                        </button>
                    </div>

                    {/* Sort options */}
                    <div style={{ marginBottom: '20px' }}>
                        <label>Sort by:</label>
                        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ marginLeft: '10px', padding: '8px' }}>
                            <option value="none">None</option>
                            <option value="name">Name</option>
                            <option value="rating">Rating</option>
                        </select>
                    </div>

                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {sortedUploads.map((upload, index) => (
                            <li key={index} style={{ marginBottom: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <p style={{ margin: 0 }}><strong>{upload.storyName}</strong></p>
                                    <div style={{ display: 'flex', gap: '5px' }}>
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <span
                                                key={star}
                                                onClick={() => handleRatingClick(upload.id, star)}
                                                style={{ cursor: 'pointer', color: star <= upload.rating ? 'gold' : 'gray' }}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
                                    <button
                                        style={{ padding: '5px 10px', backgroundColor: '#6a0dad', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                                        onClick={() => handleViewClick(upload)}
                                    >
                                        View
                                    </button>
                                    <button
                                        style={{ padding: '5px 10px', backgroundColor: '#1e90ff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                                        onClick={() => handleEditClick(upload)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                                        onClick={() => handleDeleteClick(upload.id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        style={{ padding: '5px 10px', backgroundColor: upload.liked ? '#ffd700' : '#f0f0f0', color: 'black', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                                        onClick={() => handleLikeClick(upload.id)}
                                    >
                                        👍 {upload.liked ? 'Liked' : 'Like'}
                                    </button>
                                    <button
                                        style={{ padding: '5px 10px', backgroundColor: upload.favorited ? 'red' : '#f0f0f0', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                                        onClick={() => handleFavoriteClick(upload.id)}
                                    >
                                        ❤️ {upload.favorited ? 'Favorited' : 'Favorite'}
                                    </button>
                                    <button
                                        style={{ padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                                        onClick={() => handleDownloadClick(upload.image, upload.storyName)}
                                    >
                                        Download
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={() => setIsFormVisible(true)}
                        style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        Add Another Story
                    </button>
                </div>
            </div>

            {isFormVisible && (
                <div style={{
                    backgroundColor: 'lightblue',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    width: '400px',
                    position: 'absolute',
                    top: '20%',
                    left: '50%',
                    transform: 'translate(-50%, -20%)',
                }}>
                    <h3>{isEditing ? 'Edit Story' : 'Submit Your Story'}</h3>
                    <form onSubmit={handleSubmitStory}>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Name:</label>
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                style={{ width: '100%', padding: '8px' }}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Story Name:</label>
                            <input
                                type="text"
                                value={storyName}
                                onChange={(e) => setStoryName(e.target.value)}
                                style={{ width: '100%', padding: '8px' }}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Comments:</label>
                            <textarea
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                style={{ width: '100%', padding: '8px' }}
                                required
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label>Upload Image:</label>
                            <input type="file" onChange={handleImageUpload} required={!isEditing} />
                        </div>
                        <button type="submit" style={{ padding: '10px', backgroundColor: '#6a0dad', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            {isEditing ? 'Update Story' : 'Submit Story'}
                        </button>
                        <button
                            onClick={clearForm}
                            style={{ padding: '10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', marginLeft: '10px', cursor: 'pointer' }}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}

            {/* Story Section with Image on One Side */}
            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between', // Space between the text and image
                alignItems: 'center', // Center align the items vertically
                padding: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent background
                borderRadius: '10px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            }}>
                <div style={{ width: '60%', padding: '10px' }}>
                    <h2>The Three Fishes Story</h2>
                    <p style={{ textAlign: 'justify' }}>
                        The parable of the three fishes is an interesting and engaging one. It is also one of the popular moral tales from the Panchatantra tales.
                    </p>
                    <p style={{ textAlign: 'justify' }}>
                        Once upon a time, there lived three fishes in a pond. They were close friends and were living together for years, in the same pond.
                        One day, while on his journey, a passing fisherman saw that the pond was filled with fishes.
                        He was surprised and delighted, and immediately informed his fellows about it. Together, they decided to come the next morning and catch those fishes.
                    </p>
                    <p style={{ textAlign: 'justify' }}>
                        One of the three fishes, who was also the wisest, heard the conversation between the fisherman and his fellows.
                        It devised a strategy, immediately rushed to the other two, explained the entire situation, and proposed a plan to leave the pond immediately and move to another place.
                    </p>
                    <p style={{ textAlign: 'justify' }}>
                        The second fish agreed and decided to move out from the pond quickly.
                        The third fish, however, mocked them. He felt that the pond was their home, and they must not leave their home.
                        Since the other two fishes were unable to convince the third fish, they left the pond and decided to let him follow his own course of action.
                    </p>
                    <p style={{ textAlign: 'justify' }}>
                        The next day, the fisherman and his fellows cast their nets and caught plenty of fishes. They also managed to catch the third fish, who had refused to leave the pond due to its foolishness, while the other two fishes, who had left earlier and displayed cleverness, were rescued and rewarded.
                    </p>
                </div>
                <div style={{ width: '30%', padding: '10px' }}>
                    <img src='/fish1.jpg' alt="The Three Fishes" style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
                </div>
            </div>

            {/* Speaker and Mute buttons aligned in one row */}
            <div style={{
                display: 'flex', 
                alignItems: 'center', 
                marginTop: '20px',
                gap: '20px' // Add space between buttons
            }}>
                {/* Speaker button */}
                <div 
                    onClick={handlePlayAudio} 
                    style={{
                        cursor: 'pointer', 
                        padding: '10px', 
                        borderRadius: '50%', 
                        backgroundColor: '#fff', 
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        width: '60px',
                        height: '60px'
                    }}
                >
                    <img src="/sd.png" alt="Speaker" style={{ width: '50%', height: '50%' }} />
                </div>
                {/* Mute button */}
                <div 
                    onClick={handleMuteToggle} 
                    style={{
                        cursor: 'pointer', 
                        padding: '10px', 
                        borderRadius: '50%', 
                        backgroundColor: '#fff', 
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        width: '60px',
                        height: '60px'
                    }}
                >
                    <img src="/mute.png" alt="Mute" style={{ width: '50%', height: '50%' }} />
                </div>
            </div>
        </div>
    );
}

export default StoryDetails2;
