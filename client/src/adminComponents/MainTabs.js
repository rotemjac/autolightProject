// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";
// import React, {useState} from "react";
// import {AiFillBulb, AiOutlineDatabase, AiTwotoneBook} from "react-icons/all";
// import yellow from "@material-ui/core/colors/yellow";
// import {AiFillPicture} from "react-icons/all";
//
//
//
//
// function CreateMainTabs(props) {
//
//     function handleTabsChange(e,value) {
//         setScreen(value);
//         console.log(value)
//     }
//     const [screen,setScreen]=useState("");
//
//     return(
//        <div className="main-tabs-div" style={{  display: "flex",
//            justifyContent: "center",
//            alignItems: "center",
//            flexWrap: "wrap"}}>
//            <Tabs className="tabs"
// /*
//                  classes={{ root: classes.root, scroller: classes.scroller }}
// */
//                  onChange={handleTabsChange}
//                  value={screen}
//                  indicatorColor="primary"
//                  aria-label="icon label tabs example"
//                  variant={"scrollable"}
//                  scrollButtons={"on"}
//            >
//                <Tab className="tabs"
//                     value="Warning lights"
//                     icon={<AiFillBulb style={{fill : "yellow"}} /> }
//                     label="Warning lights"
//                />
//                <Tab
//                    value="Upload Photo"
//                    icon={<AiFillPicture style={{ fill: "blue" }} />}
//
//                    label="Upload photo"
//                />
//                <Tab
//                    value="Warning light history"
//                    icon={<AiTwotoneBook style={{ fill: "red" }} />}
//                    label="Warning light history"
//                />
//                <Tab
//                    value="Manage Data"
//                    icon={<AiOutlineDatabase style={{ fill: "orange" }} />}
//                    label="Manage Data"
//                />
//          </Tabs>
//        </div>
//     )
// }
//
// export default CreateMainTabs;
