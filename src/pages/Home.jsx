import React, { useEffect, useState } from "react";
import appwriteService from "../Appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import '../App.css'

function Home() {
  const [posts, setPosts] = useState([]);
  const isUserAuthenticated = useSelector((state) => state.auth.status);
  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

    return (
      <div className="w-full py-3 text-center md:text-2xl text-slate-300  lg:text-5xl h-full min-h-screen bg-[url('../../src/assets/mainbg1.jpg')] bg-no-repeat bg-center bg-cover   ">
         <h2 className="maintext font-bold">Student Project Manager</h2>
      </div>
    );
 
  }


export default Home;
