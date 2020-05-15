import React, { Fragment } from "react";
import { useQuery, gql } from '@apollo/client';

const VENDOR = gql`
    {
        vendorOne(filter:{ name:"East-West Tea"}) {
            _id
            name
            phone
            hours {
                start
                end
                day
            }
            locations {
                name
            }
            team {
                name
                netid
                phone
            }
        }
    }
`;

const Settings = () => {
    const { loading, error, data } = useQuery(VENDOR);

    if (loading) return (<p>Loading...</p>);
    if (error) return (<p>Error :(</p>);
    if (!data) return (<p>No Data...</p>);

    console.log(data);
    
    return (
        <Fragment>
            Vendor: {data.vendorOne.name}
        </Fragment>
    )
}

export default Settings;