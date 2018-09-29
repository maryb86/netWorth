const accountHeaders = { // MARYTODO:  MIXING OF HEADERS AND DATA IS WEIRD HERE
    assets: {
        header: "Assets",
        commonColumns: ["Interest Rate"],
        shortTerm: "Cash and Investments",
        longTerm: "Long Term Assets"
    },
    liabilities: {
        header: "Liabilities",
        commonColumns: ["Monthly Payment", "Interest Rate"],
        shortTerm: "Short Term Liabilities",
        longTerm: "Long Term Debt"
    }
};
export default accountHeaders;