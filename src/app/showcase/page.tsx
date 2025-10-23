"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Rocket } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ShowcasePage = () => {
  useEffect(() => {
    gsap.to(".gsap-box", {
      scrollTrigger: {
        trigger: ".gsap-box",
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
      x: 500,
      rotation: 360,
      duration: 3,
    });
  }, []);

  return (
    <div className="container mx-auto p-10 space-y-10">
      <h1 className="text-4xl font-bold mb-10">Component Showcase</h1>

      {/* shadcn/ui */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">shadcn/ui</h2>
        <Button>shadcn/ui Button</Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
            </DialogHeader>
            <p>This is a dialog.</p>
          </DialogContent>
        </Dialog>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Dropdown</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>Link 1</NavigationMenuItem>
            <NavigationMenuItem>Link 2</NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Accordion Item 1</AccordionTrigger>
            <AccordionContent>
              This is the content of the first accordion item.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content for tab 1.</TabsContent>
          <TabsContent value="tab2">Content for tab 2.</TabsContent>
        </Tabs>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover for Tooltip</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>This is a tooltip.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* daisyUI */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">daisyUI</h2>
        <button className="daisy-btn daisy-btn-primary">
          daisyUI Button
        </button>
      </div>

      {/* Lucide */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Lucide Icons</h2>
        <Rocket className="w-10 h-10" />
      </div>

      {/* Framer Motion */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Framer Motion</h2>
        <motion.div
          className="w-24 h-24 bg-blue-500 rounded-lg"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </div>

      {/* GSAP */}
      <div className="h-screen">
        <h2 className="text-2xl font-semibold">GSAP ScrollTrigger</h2>
        <div className="gsap-box w-24 h-24 bg-green-500 rounded-lg mt-10" />
      </div>
    </div>
  );
};

export default ShowcasePage;
