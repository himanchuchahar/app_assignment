const themeConstants = {
    spacing: {
        small: 8,
        medium: 12,
        large: 24,
    },
    color: {
        lightGrey: "#ededed",
        darkGrey: "#4a4a4a",
        secondaryColor: "#ea7f28",
        hoverColor: "d37324",
    },
    font: {
        big: 32,
        medium: 18,
        small: 14,
        xsmall: 12,
    },
    layout: {
        header: 80,
        footer: 80,
    }
};



const sharedStyles = theme => ({
    panel: {
        padding: themeConstants.spacing.medium,
        border: "1px solid #ededed",
    },
    bigText: {
        fontSize: themeConstants.font.big + "px",
        fontWeight: "bold",
    },
    mediumText: {
        fontSize: themeConstants.font.medium + "px",
    },
    mediumTextBold: {
        fontSize: themeConstants.font.medium + "px",
        fontWeight: "bold"
    },
    smallText: {
        fontSize: themeConstants.font.small + "px",
    },
    xsmallText: {
        fontSize: themeConstants.font.xsmall + "px",
    },
    appHeader: {
        height: themeConstants.layout.header + "px",
        backgroundColor: "white",
        boxShadow: "none",
        borderBottom: "1px solid " + themeConstants.color.lightGrey,
        marginBottom: themeConstants.spacing.small + "px",
    },
    footer: {
        height: themeConstants.layout.footer + "px",
        position: "fixed",
        borderTop: "1px solid " + themeConstants.color.lightGrey,
        width: "100%",
        textAlign: "center",
        backgroundColor: "white",
        paddingTop: themeConstants.spacing.large +"px",
    },
    fullWidth: {
        width: '100%',
    },
    textLinks: {
        color: themeConstants.color.secondaryColor,
        fontSize: themeConstants.font.xsmall + "px",
        textDecoration: 'none',  
        cursor: 'pointer',  
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    textLinkDisabled: {
        cursor: 'not-allowed',
        fontSize: themeConstants.font.xsmall + "px",
        color: themeConstants.color.darkGrey,
        '&:hover': {
            textDecoration: 'none',
        },
    },
});

export default sharedStyles;