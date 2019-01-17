function range(end, start = 0, step = 1) {
    let range = [];
    for (let i = start; i < end; i += step) {
        range.push(i);
    }
    return range;
}