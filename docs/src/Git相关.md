这里记录一下git的使用和相关规范

<!-- These are common Git commands used in various situations:

start a working area (see also: git help tutorial)
   clone     Clone a repository into a new directory
   init      Create an empty Git repository or reinitialize an existing one

work on the current change (see also: git help everyday)
   add       Add file contents to the index
   mv        Move or rename a file, a directory, or a symlink
   restore   Restore working tree files
   rm        Remove files from the working tree and from the index

examine the history and state (see also: git help revisions)
   bisect    Use binary search to find the commit that introduced a bug
   diff      Show changes between commits, commit and working tree, etc
   grep      Print lines matching a pattern
   log       Show commit logs
   show      Show various types of objects
   status    Show the working tree status

grow, mark and tweak your common history
   branch    List, create, or delete branches
   commit    Record changes to the repository
   merge     Join two or more development histories together
   rebase    Reapply commits on top of another base tip
   reset     Reset current HEAD to the specified state
   switch    Switch branches
   tag       Create, list, delete or verify a tag object signed with GPG

collaborate (see also: git help workflows)
   fetch     Download objects and refs from another repository
   pull      Fetch from and integrate with another repository or a local branch
   push      Update remote refs along with associated objects

'git help -a' and 'git help -g' list available subcommands and some
concept guides. See 'git help <command>' or 'git help <concept>'
to read about a specific subcommand or concept.
See 'git help git' for an overview of the system.


github pages只会寻找根目录index.html；如果没有就会显示md文件。
照此思路，对于vue项目，应该新建一个分支（gh-pages）放dist文件里的东西,github你的仓库  settings pages选分支选gh-pages，
可以写一个自动化脚本,
# deploy.sh
###
 # @Descripttion: 部署命令是 bash deploy.sh
 # @Author: xx
 # @Date: 2021-08-27 14:32:19
### 
# 错误时停止
set -e

# 打包
npm run build

# 进入目标文件夹
cd dist

# 提交到本地仓库

git init
git add -A
git commit -m 'deploy'

# 提交到 你的项目的 gh-pages 分支
git push -f git@你的仓库.git master:gh-pages

cd - -->

