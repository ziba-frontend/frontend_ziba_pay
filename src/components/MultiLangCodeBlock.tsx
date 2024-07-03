"use client";
import React, { ReactNode } from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import "@reach/tabs/styles.css";

interface MultiLangCodeBlockProps {
   children: ReactNode[];
}

const MultiLangCodeBlock = (props: MultiLangCodeBlockProps) => {
   return (
      <div style={{ position: "relative" }}>
         <Tabs>
            <TabList style={{ position: "absolute", top: -35, right: 0 }}>
               {React.Children.map(props.children, (child, index) => {
                  const element = child as React.ReactElement;
                  const className =
                     element.props.children?.props?.className || "";
                  const language = className.replace(/language-/, "");
                  return <Tab key={index}>{language || "unknown"}</Tab>;
               })}
            </TabList>
            <TabPanels>
               {React.Children.map(props.children, (child, index) => {
                  return <TabPanel key={index}>{child}</TabPanel>;
               })}
            </TabPanels>
         </Tabs>
      </div>
   );
};

export default MultiLangCodeBlock;
