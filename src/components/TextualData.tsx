let message: any = {
    totalExpenditureFeature: (
        <>
            <p className="m-5">
                Here is an example to help you understand the total expenditure feature.
            </p>
            <p className="m-5">
                Initially, m1 pays 1000 rs, and since it is an equal share scenario, m1's total expenditure becomes 500
                rs. The remaining 500 rs is still owed by m2.
            </p>
            <p className="m-5">
                Later, m2 pays 800 rs with an equal share arrangement. Now, m1's total expenditure increases to 500 rs +
                400 rs = 900 rs. Please note that this total expenditure calculation is independent of the debt owed by
                m2 to m1.
            </p>
            <p className="m-5">
                The total expenditure feature provides an overview of how much each participant has spent throughout the
                trip, irrespective of any outstanding debts or payments between participants. It helps in understanding
                the individual contribution towards shared expenses and facilitates transparency in expense tracking.
            </p>
            <p className="m-5">
                SplitTrip ensures accurate calculations and provides detailed reports, enabling participants to easily
                keep track of their expenses and settle any outstanding debts at the end of the trip.
            </p>
        </>
    )
}

export default message;