import React, { useEffect } from "react";
import Image from "next/image";
import { FaCamera } from "react-icons/fa";
import { useState } from "react";
import ContextMenu from "../..//components/common/ContextMenu.jsx";
import PhotoPicker from "../../components/common/PhotoPicker.jsx";
import PhotoLibrary from "../../components/common/PhotoLibrary.jsx";
import CapturePhoto from "../../components/common/CapturePhoto.jsx";

function Avatar({ type, image, setimage }) {
  const [hover, sethover] = useState(false);
  const [isContextMenuVisible, setisContextMenuVisible] = useState(false);
  const [contextMenuCordinate, setcontextMenuCordinate] = useState({
    x: 0,
    y: 0,
  });
  const [grabPhot, setgrabPhoto] = useState(false);
  const [showPhotoLibrary, setshowPhotoLibrary] = useState(false);
  const [capturePhoto, setcapturePhoto] = useState(false);

  const showContextmenu = (e) => {
    e.preventDefault();

    setcontextMenuCordinate({
      x: e.pageX,
      y: e.pageY,
    });
    setisContextMenuVisible(true);
  };
  const photoPickerChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const data = document.createElement("img");
    reader.onload = function (event) {
      data.src = event.target.result;
      data.setAttribute("data-src", event.target.result);
    };
    reader.readAsDataURL(file);
    setTimeout(() => {
      setimage(data.src);
    }, 100);
  };

  const contextMenuOptions = [
    {
      name: "Take Photo",
      callback: () => {
        setcapturePhoto(true);
      },
    },
    {
      name: "Choose From Library",
      callback: () => {
        setshowPhotoLibrary(true);
      },
    },
    {
      name: "Upload Photo",
      callback: () => {
        setgrabPhoto(true);
      },
    },
    {
      name: "Remove Photo",
      callback: () => {
        setimage("/default_avatar.png");
      },
    },
  ];

  useEffect(() => {
    if (grabPhot) {
      const data = document.getElementById("photo-picker");
      data.click();
      document.body.onfocus = (e) => {
        setTimeout(() => {
          setgrabPhoto(false);
        }, 1000);
      };
    }
  }, [grabPhot]);

  return (
    <>
      <div className="flex items-center justify-center">
        {type === "sm" && (
          <div className="relative h-10 w-10">
            <Image src={image} alt="avatar" className="rounded-full" fill />
          </div>
        )}
        {type === "lg" && (
          <div className="relative h-14 w-14">
            <Image src={image} alt="avatar" className="rounded-full" fill />
          </div>
        )}
        {type === "xl" && (
          <div
            className="relative cursor-pointer z-0"
            onMouseEnter={() => sethover(true)}
            onMouseLeave={() => sethover(false)}
          >
            <div
              className={`z-10 bg-photopicker-overlay-background h-60 w-60 absolute top-0 left-0 flex items-center rounded-full justify-center flex-col text-center gap-2
                ${hover ? "visible" : "hidden"}
                `}
              onClick={(e) => showContextmenu(e)}
              id="context-openner"
            >
              <FaCamera
                className="text-2xl"
                id="context-openner"
                onClick={(e) => showContextmenu(e)}
              />
              <span onClick={(e) => showContextmenu(e)} id="context-openner">
                Change Profile Picture
              </span>
            </div>
            <div className="flex items-center justify-center h-60 w-60">
              <Image src={image} alt="avatar" className="rounded-full" fill />
            </div>
          </div>
        )}
      </div>
      {isContextMenuVisible && (
        <ContextMenu
          options={contextMenuOptions}
          cordinates={contextMenuCordinate}
          contextMenu={isContextMenuVisible}
          setContextMenu={setisContextMenuVisible}
        />
      )}
      {capturePhoto && (
        <CapturePhoto setimage={setimage} hide={setcapturePhoto} />
      )}
      {showPhotoLibrary && (
        <PhotoLibrary
          setimage={setimage}
          hidePhotoLibrary={setshowPhotoLibrary}
        />
      )}
      {grabPhot && <PhotoPicker onChange={photoPickerChange} />}
    </>
  );
}

export default Avatar;
