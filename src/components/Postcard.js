import React, { useState, useEffect } from 'react'

import ColourPalette from './ColourPalette'
import Button from './Button'
import Slider from './Slider'
import ColorPicker from './ColorPicker'

const Postcard = ({ canvasId, canvasImage, requestImage, requestState }) => {

    const [kernelSize, setKernelSize] = useState(5);
    const [colourCluster, setColourCluster] = useState(8);
    const [colourPalette, setColourPalette] = useState();

    const [ownImage, setOwnImage] = useState(false);
    const [currentBase64, setCurrentBase64] = useState(null);
    const [canvasPixels, setCanvasPixels] = useState();

    const [showPicker, setShowPicker] = useState(false);
    const [boxToChange, setBoxToChange] = useState(null)

    let data = {
        block_size: kernelSize,
        colour_cluster: colourCluster,
        base64: currentBase64
    };

    // useeffect invoke everytime, add[] to only invoke at start
    // post request of dog "mochi" at start up only
    useEffect(() => {
        const showPixelateImageStartUp = async () => {
            const base64String = await getCanvasBase64(canvasImage)
            data.base64 = base64String;
            const response = await requestImage(data);
            setCanvasPixels(response.pixels);
            drawPixelatedImage(response);
        }
        showPixelateImageStartUp();
    }, []);


    // draw data from api response to canvas
    const drawPixelatedImage = ({ pixels, colour_of_k }) => {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        const ctxData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = ctxData.data;

        const colours = colour_of_k;
        setColourPalette(colour_of_k);

        const step = 4;
        for (let i = 0; i < pixels.length; i++) {
            let k = pixels[i];
            let actualPoint = i * step - 1;

            data[actualPoint + 1] = colours[k][0];
            data[actualPoint + 2] = colours[k][1];
            data[actualPoint + 3] = colours[k][2];
            if (actualPoint > 0) {
                data[actualPoint] = 255;
            }
        }
        ctx.putImageData(ctxData, 0, 0);
    }

    // draws original image onto canvas and return canvas base64
    const getCanvasBase64 = (img) => {
        return new Promise((resolve, reject) => {
            const canvas = document.getElementById(canvasId);
            const ctx = canvas.getContext('2d');
            const wantedSize = 400;

            const image = new Image();
            image.src = img;

            // wait for image to load before processing
            image.onload = () => {
                if (image.width > wantedSize || image.height > wantedSize) {
                    reduceImage(image, wantedSize);
                }

                canvas.width = image.width;
                canvas.height = image.height;

                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

                const base64 = canvas.toDataURL();
                const [_, base64String] = base64.split(',');
                setCurrentBase64(base64String);
                resolve(base64String);
            };
        })
    }

    // invoke when image too big
    const reduceImage = (img, wantedSize) => {
        let aspectRatioW, aspectRatioH;
        if (img.width > img.height) {
            aspectRatioW = 1;
            aspectRatioH = img.height / img.width;

        } else {
            aspectRatioW = img.width / img.height;
            aspectRatioH = 1;
        }

        img.width = wantedSize * aspectRatioW;
        img.height = wantedSize * aspectRatioH;
    }

    // update state for box kernel
    const updateBoxSizeValue = (e) => {
        const sliderNewVal = parseInt(e.target.value);
        setKernelSize(sliderNewVal);
    }

    // update state for k means clusters
    const updateColourCluster = (e) => {
        const sliderNewVal = parseInt(e.target.value);
        setColourCluster(sliderNewVal);
    }

    // draws unpixelated image to canvas, request for pixelated data
    const pixelate = async () => {
        const response = await requestImage(data);
        setCanvasPixels(response.pixels);
        drawPixelatedImage(response);
    }

    // trigger input file when button is pressed
    const openDialog = () => {
        const file = document.getElementById('file-input');
        file.click();
    }

    // checks if it's image and draws original image onto canvas, updates states
    const drawUserImage = async (e) => {

        const str = e.target.accept;
        const fileType = e.target.files[0].type;

        const regexFileType = new RegExp(fileType, 'g');
        const checkRegEx = str.match(regexFileType);

        if (checkRegEx === null) {
            return;
        }

        setOwnImage(true);
        const img = e.target.files[0];
        const url = URL.createObjectURL(img);
        await getCanvasBase64(url);
        setColourPalette();
    }

    // save image when button is clicked
    const saveImage = () => {
        const canvas = document.getElementById(canvasId);
        const canvasUrl = canvas.toDataURL('png');
        const a = document.createElement('a');
        a.href = canvasUrl;
        a.download = 'pixelated.png';
        a.click();
    }

    //toggle colour picker, cb for colour palette divs and when pressing outside picker
    const showColourPicker = () => {
        setShowPicker(!showPicker);
    }


    return (
        <div className="postcard box-shadow">

            <div className="sub-header control-container">
                <h2 className="pixel-font">Image to Pixel Converter</h2>
            </div>

            <div style={{ position: 'relative' }}>
                <canvas id={canvasId}></canvas>

                {requestState &&
                    <div className="loading" style={{ height: document.getElementById(canvasId).clientHeight, width: document.getElementById(canvasId).clientWidth }}>
                        <h2 className="center pixel-font">PIXELATING ...</h2>
                    </div>
                }
            </div>

            <div className="canvas-control">
                <div className="control-container">
                    <h3 className="pixel-font">Pixel size: <span><h3 className='bold pixel-font'>{kernelSize}</h3></span> </h3>
                    <Slider initialValue={colourCluster} minVal={1} maxVal={100} onChangeCb={updateBoxSizeValue}></Slider>
                </div>

                <div className="control-container">
                    <h3 className="pixel-font">Colours from image: <span><h3 className='bold pixel-font'>{colourCluster}</h3></span> </h3>
                    <Slider initialValue={colourCluster} minVal={1} maxVal={20} onChangeCb={updateColourCluster}></Slider>
                </div>

                {colourPalette ?
                    <div className="control-container">
                        <h3 className="pixel-font">Colour Palette</h3>
                        <ColourPalette palette={colourPalette} updatePickerState={showColourPicker} updateBoxToChange={setBoxToChange}></ColourPalette>
                    </div>
                    :
                    <div className="control-container"></div>
                }


                {
                    showPicker &&
                    <ColorPicker showColourPicker={showColourPicker} colourToChange={boxToChange}
                        updatePalette={setColourPalette} colours={colourPalette} pixels={canvasPixels} draw={drawPixelatedImage} />
                }


                {!ownImage ?
                    <div className="button-grid">
                        <Button text="PIXELATE DOG" bgColour="#E3CD00" buttonClick={pixelate} disableBtn={requestState}></Button>
                        <input type="file" className="file-btn" id="file-input" accept="image/png, image/jpeg, image/jpg" onChange={(e) => { drawUserImage(e) }} />
                        <Button text="CHOOSE IMAGE" bgColour="#008EAD" buttonClick={openDialog} disableBtn={requestState}></Button>
                    </div>
                    :
                    <div className="button-grid">
                        <Button text="PIXELATE IMAGE" bgColour='#E3CD00' buttonClick={pixelate} disableBtn={requestState}></Button>
                        <Button text="SAVE IMAGE" bgColour="#5FBD00" buttonClick={saveImage} disableBtn={requestState}></Button>
                    </div>
                }
            </div>

        </div>
    )
}

export default Postcard
