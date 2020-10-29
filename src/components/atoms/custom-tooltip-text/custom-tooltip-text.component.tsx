import React, { Fragment, ReactElement, FC } from "react";
import Typography from "@material-ui/core/Typography";
// Local
import { targetToTooltipObject } from "./constants";
import { TooltipTextProps } from "./types";

const CustomTooltipText: FC<TooltipTextProps> = ({
    target,
}: TooltipTextProps): ReactElement => {
    const { title, bodyItems } = targetToTooltipObject(target);

    return (
        <Fragment>
            <Typography component="h5" variant="h5" align="center">
                {title}
            </Typography>

            {bodyItems.map((bodyItem: string) => {
                return (
                    <Typography
                        key={bodyItems.indexOf(bodyItem)}
                        component="p"
                        variant="body1"
                        align="center"
                    >
                        {bodyItem}
                    </Typography>
                );
            })}
        </Fragment>
    );
};

export default CustomTooltipText;
