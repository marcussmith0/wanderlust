import React, { Component } from 'react'

class Places extends Component {
    render() {
        const list = this.props.venues.map((venue, i) => {
            return (
                <div>
                    <li key={i}>{venue.name}</li>
                    <li>{venue.categories.icon}</li>
                </div>
            )
        })
        return (
            <div>
                <ol>
                    {list}
                </ol>
            </div>
        )
    }
}

export default Places