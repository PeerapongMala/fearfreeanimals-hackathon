// AnimalModelViewer.js
import React from "react";
import "@google/model-viewer";

function AnimalModelViewer() {
    return (
        <model-viewer
            src="/images/quirky_series_-_free_animals_pack.glb"
            alt="A 3D model of an animal"
            auto-rotate
            camera-controls
            ar
            ar-modes="webxr scene-viewer quick-look"
            style={{ width: "100%", height: "300px" }}
        >
        </model-viewer>
    );
}

export default AnimalModelViewer;
