"use client";
import React, { useEffect, useState, useContext } from "react";
import { useAuth } from "@clerk/nextjs";
import { GET_ALL_CONTACTS } from "@/utils/ApiRoutes";
import axios from "axios";
import { useRouter } from "next/navigation.js";
import Loader from "../Loader.jsx";
import { BiArrowBack, BiSearchAlt2 } from "react-icons/bi";
import { StateContext } from "@/app/page";
import SearchBar from "./SearchBar";
import ChatList from "./ChatList.jsx";
import ChatLIstItem from "./ChatLIstItem.jsx";

function ContactsList() {
  const router = useRouter();
  const { userId, getToken } = useAuth();
  const [loading, setloading] = useState(true);
  const [allcontacts, setallcontacts] = useState([]);
  const { setSet_Contact_page } = useContext(StateContext);

  useEffect(() => {
    const getContacts = async () => {
      const token = await getToken();
      try {
        const { data } = await axios.get(GET_ALL_CONTACTS, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!data.authentic) {
          router.push("/sign-in");
        }
        if (!data.status) {
          router.refresh("/");
        }
        setallcontacts(data.data);
        setloading(false);
      } catch (error) {
        console.log(error);
        router.push("/");
      }
    };
    getContacts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="h-24 flex items-end px-3 py-4">
        <div className="flex items-center gap-12 text-white">
          <BiArrowBack
            className="cursor-pointer text-xl"
            onClick={() => setSet_Contact_page(false)}
          />
          <span>New Chat</span>
        </div>
      </div>

      <div className="bg-search-input-container-background h-full flex-auto overflow-auto custom-scrollbar">
        <div className="flex py-3 items-center gap-3 h-14">
          <div className="bg-search-input-container-background flex items-center gap-5 px-3 py-1 rounded-lg flex-grow mx-4">
            <div className="">
              <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-lg" />
            </div>
            <div>
              <input
                type="text"
                placeholder="Search Contacts"
                className="bg-transparent text-sm focus:outline-none text-white w-full"
              />
            </div>
          </div>
        </div>
        {Object.entries(allcontacts).map(([initialLetter, userList]) => (
          <div key={Date.now() + initialLetter}>
            <div className="text-teal-light pl-10 py-5 ">{initialLetter}</div>
            {userList.map((contact) => (
              <ChatLIstItem
                isContactPage={true}
                key={contact.user_id}
                data={contact}
              />
            ))}
          </div>
        ))}
      </div>
      {/* <SearchBar BsFilter={"false"} /> */}
    </div>
  );
}

export default ContactsList;
