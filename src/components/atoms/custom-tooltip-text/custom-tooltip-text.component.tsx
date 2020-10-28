import React, { Fragment, ReactElement, FC } from "react";
import Typography from "@material-ui/core/Typography";
// Local
import {
    targetToComplexTooltipObject,
    targetToSimpleTooltipObject,
} from "./constants";
import {
    SimpleTooltipTextType,
    ComplexTooltipTextType,
    TooltipTextProps,
} from "./types";

const SimpleTooltipText = ({ title, bodyItems }: SimpleTooltipTextType) => {
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

const ComplexTooltipText = ({
    title,
    subtitle,
    listIntro,
    listItems,
}: ComplexTooltipTextType) => {
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

const CustomTooltipText: FC<TooltipTextProps> = ({
    target,
    variant,
}: TooltipTextProps): ReactElement => {
    return (
        <Fragment>
            {variant === "simple" ? (
                <SimpleTooltipText {...targetToSimpleTooltipObject(target)} />
            ) : (
                <ComplexTooltipText {...targetToComplexTooltipObject(target)} />
            )}
        </Fragment>
    );
};

export default CustomTooltipText;
