export function mapCoupleCount(coupleCount) {
    const n = coupleCount / 2
    const coupleCounts = []
    let i = n
    while (i >= 1) {
        coupleCounts.push(i)
        i /= 2
    }
    return coupleCounts
}
