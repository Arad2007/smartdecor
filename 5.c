#include <stdio.h>
#include <string.h>

#define MAX 10

void detectLeftRecursion(char grammar[MAX][MAX], int n) {
    for (int i = 0; i < n; i++) {
        char nonTerminal = grammar[i][0];
        char *rhs = &grammar[i][3];
        if (rhs[0] == nonTerminal) {
            printf("Left recursion foound in the production: %s\n", grammar[i]);
        } else {
            printf("No left recursion in production: %s\n", grammar[i]);
        }
    }
}

int main() {
    int n;
    char grammar[MAX][MAX];
    printf("Enter the number of productions: ");
    scanf("%d", &n);
    getchar();
    printf("Enter the productions :\n");
    for (int i = 0; i < n; i++) {
        fgets(grammar[i], MAX, stdin);
        grammar[i][strcspn(grammar[i], "\n")] = '\0';
    }
    detectLeftRecursion(grammar, n);
    return 0;
}