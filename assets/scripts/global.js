function locked(s) {
	let lockedList = [9, 28, 47, 1, 72, 2, 49, 63];
	for (let i = 0; i < lockedList.length; ++i)
		if (parseInt(s.substring(0, 2)) == lockedList[i]) return true;
	return false;
}