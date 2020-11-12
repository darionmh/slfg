export default (req, res) => {
    switch (req.method) {
        case 'GET':
            break;
        case 'POST':
            break;
        default:
            res.status(405).end() //Method Not Allowed
            break
    }
    res.statusCode = 200
    res.json({ name: 'John Doe' })
}