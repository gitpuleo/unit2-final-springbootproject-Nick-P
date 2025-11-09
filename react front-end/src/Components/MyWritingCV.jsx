//Structured this way should allow extensibility when myWriting array is added to.

function MyWritingCV(props) {

    return (
        <div>
            <h3>Writing</h3>
            {props.inputData.map((article, index) => (
                <div key={index}>
                    <a href={article.link} target="_blank">
                        {article.title}
                    </a>
                </div>
            ))}
        </div>
    )
}

export default MyWritingCV;