"use client";
import Loader from "@/components/Loader.jsx";
import Button from "../../components/common/Button";

import axios from "axios";
import { useEffect, useState } from "react";

import { CHECK_USER_ROUTE, ON_BOARD_USER } from "../../utils/ApiRoutes.js";
import { useRouter } from "next/navigation.js";
import { useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image.js";
import { logo } from "@/context/constants.js";
import Input from "../../components/common/Input.jsx";
import Avatar from "../../components/common/Avatar.jsx";

export default function Page() {
  const router = useRouter();
  const [loading, setloading] = useState(true);

  const { userId, getToken } = useAuth();

  const { user } = useUser();
  const [name, setname] = useState(user?.fullName);
  const [about, setabout] = useState("Hi i am using ChatHub");
  const [image, setimage] = useState("/default_avatar.png");
  const [loader, setloader] = useState(false);

  useEffect(() => {
    const check = async () => {
      const token = await getToken();
      try {
        const { data } = await axios.post(
          CHECK_USER_ROUTE,
          {
            user_id: userId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!data.authentic) {
          router.push("/sign-in");
        }

        if (!data.onboard) {
          router.push("/");
        } else {
          setloading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    check();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const onChange = async () => {
    setloader(true);
    if (!name || name?.length < 3) {
      return;
    }
    const email = user?.emailAddresses[0].emailAddress.toString();
    const check = async () => {
      const token = await getToken();
      try {
        const { data } = await axios.post(
          ON_BOARD_USER,
          {
            user_id: userId,
            name: name,
            email: email,
            image: image,
            about: about,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!data.authentic) {
          router.push("/sign-in");
        }
        if (data.status) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
        setloader(false);
      }
    };
    check();
  };

  return (
    <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <Image
          src={logo}
          alt=""
          height={250}
          width={250}
          className="rounded-full"
        />
        <span className="text-7xl">ChatHub</span>
      </div>
      <h2 className="text-2xl">Create Your Profile</h2>
      <div className="flex gap-6 mt-6">
        <div className="flex flex-col items-center justify-center mt-5 gap-6">
          <Input
            name={"Display Name"}
            state={name}
            setstate={setname}
            label={true}
          />
          <Input
            name={"About"}
            state={about}
            setstate={setabout}
            label={true}
          />
          <div className="flex items-center justify-center">
            <Button loading={loader} onChange={onChange}>
              Create Profile
            </Button>
          </div>
        </div>
        <div>
          <Avatar type={"xl"} image={image} setimage={setimage} />
        </div>
      </div>
    </div>
  );
}
