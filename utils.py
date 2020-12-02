from typing import List, Dict


def sort_scoreboard(scoreboard) -> List[Dict]:
    '''
    This function sorts scoreboard based on the score and returns a copy
    '''

    return sorted(scoreboard, key=lambda x: x["score"], reverse=True)
