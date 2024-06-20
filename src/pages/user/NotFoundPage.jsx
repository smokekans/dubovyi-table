import { Box, List, ListItem, Typography } from "@mui/material";

export default function NotFoundPage() {
  return (
    <Box>
      <Typography variant="h1">404 Error</Typography>
      <Typography variant="p">
        Ой! Схоже, ми не змогли знайти ту сторінку, яку ви шукаєте. Можливо, ви
        ввели неправильну адресу або сторінка була видалена.
      </Typography>
      <Typography variant="p">
        Ось кілька речей, які ви можете зробити:
      </Typography>

      <List>
        <ListItem>
          <Typography variant="p">
            Перейдіть на головну сторінку і спробуйте знайти потрібну інформацію
            звідти.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="p">
            Перевірте правильність введення URL-адреси.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="p">
            Скористайтеся пошуком на нашому сайті.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="p">
            Зв'яжіться з нашою службою підтримки, якщо проблема зберігається.
          </Typography>
        </ListItem>
      </List>
    </Box>
  );
}
