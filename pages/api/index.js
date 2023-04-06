export default function handler(req, res) {

  res.status(200).json([{ id: 1, name: 'USA' }, { id: 2, name: 'Iraq' }, { id: 3, name: 'Germany' },]);
}
