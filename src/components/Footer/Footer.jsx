import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <section className="relative overflow-hidden py-4 bg-[#141E46]  text-slate-200  border-t-2 border-t-black w-full">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col mx-auto md:-ml-10 lg:-ml-24  justify-between items-center">
              <div className="mb-4 inline-flex items-center">
                <Logo width="180px" />
              </div>
              <div>
                <p className="text-sm text-slate-300">
                  &copy; Copyright 2024. All Rights Reserved by Coders United.
                </p>
              </div>
            </div>
          </div>
         
          <div className='  w-96 md:ml-30 mx-auto md:mt-10 :ml-60 mb mb-10 sm:mb-0'>
                            <h2 className="mb-6 text-md  text-center  font-semibold text-[#FC6736]  uppercase">Follow us</h2>
                            <div className='flex justify-evenly'>
                               <div>
                              <ul className="text-[#0C2D57] dark:text-[#EDEDED] font-medium">
                                <li className="mb-4">
                                    <a
                                        href="https://github.com/surajverma-07"
                                        className="hover:underline"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Github
                                    </a>
                                 </li>
                                 <li>
                                 <a
                                        href="https://www.instagram.com/surajverma_00_7/"
                                        className="hover:underline"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Instagram
                                    </a>
                                </li>
                            </ul>
                               </div>
                               <div>
                              <ul className="text-[#0C2D57] dark:text-[#EDEDED] font-medium">
                                <li className="mb-4">
                                    <a
                                        href="https://www.linkedin.com/in/suraj-kumar-verma-699b5a245/"
                                        className="hover:underline"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Linkdin
                                    </a>
                                 </li>
                                 <li>
                                 <a
                                        href="https://leetcode.com/surajverma_00_7/"
                                        className="hover:underline"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Leetcode
                                    </a>
                                </li>
                            </ul>
                               </div>
                            </div>
          </div>
       
        </div>
      </div>
    </section>
  );
}

export default Footer;
