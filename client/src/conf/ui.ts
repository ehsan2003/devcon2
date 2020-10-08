interface IUiConfiguration {
    pageProgress: {
        variant: "determinate" | "indeterminate";
    };
}

const uiConfiguration: IUiConfiguration = {
    pageProgress: {
        variant: "indeterminate",
    }
};
export default uiConfiguration;