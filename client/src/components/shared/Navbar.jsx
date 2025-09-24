import { PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import React from "react";
import { Popover } from "../ui/popover";
import { User2 ,LogOut} from "lucide-react";
import {Button} from '../ui/button'
import { Avatar, AvatarImage } from "../ui/avatar";
export const Navbar = () => {
  const user = false
  return (
    <div className="bg-white">
      <div className=" flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[rgb(27,2,248)]">Found</span>
          </h1>
        </div>
        <div className="flex items-center gap-8">
          <ul className="flex font-medium items-center gap-5">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Button variant='outline'>Login</Button>
              <Button className='bg-[rgb(27,2,248)] text-white hover:bg-[rgb(12,4,84)] '>Signup</Button>
            </div>
          ):( <Popover >
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="flex gap-4 space-y-2">
                    <Avatar className="cursor-pointer">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
              </Avatar>
              <div>
                  <h4 className="font-medium">Deepa Chaudhary</h4>
                <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet consectetur  ipsum.</p>
              </div>  
                </div>
                <div className="flex flex-col  text-gray-600 my-2">
                  
                    <div className=" flex w-fit items-center cursor-pointer">
                      <User2/>  
                      <Button variant='link'>View Profile</Button></div>
                   <div className=" flex w-fit items-centercursor-pointer">
                    <LogOut/>  <Button variant='link'>View Logout</Button></div>
            
                </div>
             
            
            
           
            </PopoverContent>
          </Popover>)}
          
         
        </div>
      </div>
    </div>
  );
};
