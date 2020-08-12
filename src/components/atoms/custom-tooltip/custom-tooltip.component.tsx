import React, { Fragment, ReactElement, FC } from "react";
import Typography from "@material-ui/core/Typography";
// Local
import {
    targetToComplexTooltipObject,
    targetToSimpleTooltipObject,
} from "./constants";
import { SimpleTooltipType, ComplexTooltipType, TooltipProps } from "./types";

const SimpleTooltip = ({ title, bodyItems }: SimpleTooltipType) => {
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

const ComplexTooltip = ({
    title,
    subtitle,
    listIntro,
    listItems,
}: ComplexTooltipType) => {
    return (
        <Fragment>
            <Typography component="h5" variant="h5" align="center">
                {title}
            </Typography>
            <Typography component="p" variant="body1" align="center">
                {subtitle}
                <br></br>
                <br></br>
                {listIntro}
            </Typography>
            <ul>
                {listItems.map((listItem) => {
                    return (
                        <li key={listItems.indexOf(listItem)}>
                            <Typography
                                component="p"
                                variant="body1"
                                align="center"
                            >
                                {listItem}
                            </Typography>
                        </li>
                    );
                })}
            </ul>
        </Fragment>
    );
};

const CustomTooltip: FC<TooltipProps> = ({
    target,
    variant,
}: TooltipProps): ReactElement => {
    return (
        <Fragment>
            {variant === "simple" ? (
                <SimpleTooltip {...targetToSimpleTooltipObject(target)} />
            ) : (
                <ComplexTooltip {...targetToComplexTooltipObject(target)} />
            )}
        </Fragment>
    );
};

export default CustomTooltip;
