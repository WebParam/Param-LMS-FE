import IComment from "@/app/interfaces/comment";


export function getTop5Commenters(commentList: IComment[]): [string, number][] {
    // Count the occurrences of each commenter
    const commenterCounts: { [commenterName: string]: number } = {};
    
    commentList.forEach(comment => {
        const commenterName = comment.creatingUserName;
        commenterCounts[commenterName] = (commenterCounts[commenterName] || 0) + 1;
    });

    // Convert the commenterCounts object to an array of tuples
    const commenterTuples: [string, number][] = Object.entries(commenterCounts);

    // Sort commenters based on comment count in descending order
    const sortedCommenters = commenterTuples.sort((a, b) => b[1] - a[1]);

    // Take the top 5 commenters
    const top5Commenters = sortedCommenters.slice(0, 5);

    return top5Commenters;
}