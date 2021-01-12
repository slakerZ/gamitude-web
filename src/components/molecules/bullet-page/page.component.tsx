import React from "react";
import { connect } from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AddIcon from "@material-ui/icons/Add";

import { selectPages } from "redux/bulletPages/pages.selectors";

import CustomIcon from "components/atoms/custom-icon/custom-icon.component";
import {
    a11yProps,
    TabPanel,
} from "components/atoms/tab-panel/tab-panel.component";
import ToggleableTooltip from "components/atoms/toggleable-tooltip/toggleable-tooltip.component";

import usePageStyles from "./styles";
import PagePropTypes from "./types";

const Page = ({
    pagesCurrJournalIndex,
    tasksCurrPageIndex,
    handleChangeCurrentPage,
    handleOpenNewPageDialog,
    pages,
}: PagePropTypes) => {
    const classes = usePageStyles();
    return (
        <div
            aria-label="Pages in current Journal"
            className={classes.tabsWrapper}
        >
            <TabPanel
                value={pagesCurrJournalIndex}
                index={pagesCurrJournalIndex}
                role={"journal"}
                id={"pages-in-journal"}
            >
                <div className={classes.tabsWrapper}>
                    <Tabs
                        aria-label="Page navigation"
                        orientation="vertical"
                        variant="scrollable"
                        value={tasksCurrPageIndex}
                        onChange={handleChangeCurrentPage}
                        className={classes.tabs}
                    >
                        {pages.map(({ id, icon, name }) => {
                            return (
                                <Tab
                                    key={id}
                                    label={name}
                                    value={id}
                                    {...a11yProps(id, "pages-with-tasks")}
                                    icon={
                                        <CustomIcon
                                            variant={icon}
                                            size="small"
                                        />
                                    }
                                />
                            );
                        })}
                    </Tabs>
                    <ToggleableTooltip target="page">
                        <IconButton
                            aria-label="Add page"
                            color="primary"
                            onClick={handleOpenNewPageDialog}
                        >
                            <AddIcon />
                        </IconButton>
                    </ToggleableTooltip>
                </div>
            </TabPanel>
        </div>
    );
};
const mapStateToProps = (state: any) => ({
    pages: selectPages(state),
});
export default connect(mapStateToProps)(Page);
