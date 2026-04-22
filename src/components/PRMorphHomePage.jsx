import React, { useState } from 'react';
import './PRMorphHomePage.css'; // Ensure to create a CSS file for styles

const PRMorphHomePage = () => {
    const [image, setImage] = useState(null);
    const [template, setTemplate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [transformedImage, setTransformedImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    };

    const handleTemplateChange = (e) => {
        setTemplate(e.target.value);
    };

    const generateImage = () => {
        if (!image || !template) {
            setError('Please select an image and a template.');
            return;
        }
        setError(null);
        setLoading(true);
        // Simulate image transformation using canvas filters
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const imgElement = new Image();
        imgElement.src = image;
        imgElement.onload = () => {
            canvas.width = imgElement.width;
            canvas.height = imgElement.height;
            ctx.drawImage(imgElement, 0, 0);

            // Apply filters based on selected template
            if(template === 'filter1') {
                ctx.filter = 'grayscale(100%)';
            } else if(template === 'filter2') {
                ctx.filter = 'sepia(100%)';
            }
            // More filters can be added here

            ctx.drawImage(imgElement, 0, 0);
            setTransformedImage(canvas.toDataURL());
            setLoading(false);
        };
        imgElement.onerror = () => {
            setError('Error loading image.');
            setLoading(false);
        };
    };

    return (
        <div className="pr-morph-container">
            <h1>PRMorph Home Page</h1>
            <div className="upload-section">
                <input type="file" accept="image/*" onChange={handleImageChange} />
            </div>
            <div className="template-selection">
                <label>Select Template:
                    <select value={template} onChange={handleTemplateChange}>
                        <option value="">--Select--</option>
                        <option value="filter1">Filter 1</option>
                        <option value="filter2">Filter 2</option>
                    </select>
                </label>
            </div>
            <button onClick={generateImage} disabled={loading}>Generate</button>
            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            <div className="preview-section">
                <h2>Before/After Preview</h2>
                <div className="image-preview">
                    {image && <img src={image} alt="Before" />}  
                    {transformedImage && <img src={transformedImage} alt="After" />}  
                </div>
            </div>
        </div>
    );
};

export default PRMorphHomePage;
